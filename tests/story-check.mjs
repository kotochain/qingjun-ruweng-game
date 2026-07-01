import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext } from "node:vm";

const root = fileURLToPath(new URL("..", import.meta.url));
const dataSrc = readFileSync(join(root, "js/data.js"), "utf8");

const ctx = { console };
const wrapped = dataSrc + "\n;this.STORY=STORY;this.ASSETS=ASSETS;";
new Function(wrapped).call(ctx);
const STORY = ctx.STORY;
const ASSETS = ctx.ASSETS;

const errors = [];
const warnings = [];
const nodes = Object.keys(STORY);

function checkGoto(from, key) {
  if (!key) return;
  if (key === "__end__") return;
  if (!STORY[key]) errors.push(`[${from}] goto 指向不存在节点: ${key}`);
}

for (const id of nodes) {
  const node = STORY[id];

  if (!node.lines && !node.choices && !node.puzzle && !node.isChoice) {
    errors.push(`[${id}] 节点无 lines/choices/puzzle`);
  }

  if (node.lines) {
    node.lines.forEach((ln, i) => {
      if (ln.sprite) {
        for (const slot of ["left", "center", "right"]) {
          const sk = ln.sprite[slot];
          if (sk && !ASSETS.sprite[sk]) {
            errors.push(`[${id}:${i}] sprite 引用不存在: ${sk}`);
          }
        }
      }
    });
  }

  if (node.isChoice && !node.choices) {
    errors.push(`[${id}] isChoice=true 但没有 choices`);
  }

  if (node.choices) {
    if (node.choices.length < 2) warnings.push(`[${id}] choices 少于2个`);
    node.choices.forEach((c, i) => {
      if (!c.text) errors.push(`[${id}:choice${i}] 缺 text`);
      if (!c.goto) errors.push(`[${id}:choice${i}] 缺 goto`);
      else checkGoto(`${id}:choice${i}`, c.goto);
      if (c.set && typeof c.set.aff !== "number") warnings.push(`[${id}:choice${i}] set.aff 不是数字`);
    });
  }

  if (node.puzzle) {
    const p = node.puzzle;
    if (!p.clues || !p.clues.length) errors.push(`[${id}:puzzle] 缺 clues`);
    if (typeof p.need !== "number") errors.push(`[${id}:puzzle] 缺 need`);
    if (!p.onWin) errors.push(`[${id}:puzzle] 缺 onWin`);
    checkGoto(`${id}:puzzle.onWin`, p.onWin);
    if (p.onFail) checkGoto(`${id}:puzzle.onFail`, p.onFail);
    const correctCount = p.clues.filter(c => c.correct).length;
    if (correctCount !== p.need) {
      errors.push(`[${id}:puzzle] 正确线索数(${correctCount}) ≠ need(${p.need})`);
    }
    p.clues.forEach(c => {
      if (c.img) {
        const cluePath = join(root, `assets/clue_${c.id}.png`);
        if (!existsSync(cluePath)) warnings.push(`[${id}:puzzle] clue 图片缺失: assets/clue_${c.id}.png`);
      }
    });
  }

  if (node.bg && !ASSETS.bg[node.bg]) {
    errors.push(`[${id}] bg 引用不存在: ${node.bg}`);
  }

  checkGoto(id, node.goto);

  if (node.sprite) {
    for (const slot of ["left", "center", "right"]) {
      const sk = node.sprite[slot];
      if (sk && !ASSETS.sprite[sk]) {
        errors.push(`[${id}:sprite] sprite 引用不存在: ${sk}`);
      }
    }
  }
}

// 可达性检查
const visited = new Set();
const queue = ["intro_modern"];
while (queue.length) {
  const id = queue.shift();
  if (visited.has(id)) continue;
  if (id === "__end__") continue;
  if (!STORY[id]) { errors.push(`不可达遍历遇到不存在节点: ${id}`); continue; }
  visited.add(id);
  const node = STORY[id];
  if (node.goto) queue.push(node.goto);
  if (node.choices) node.choices.forEach(c => queue.push(c.goto));
  if (node.puzzle) {
    if (node.puzzle.onWin) queue.push(node.puzzle.onWin);
    if (node.puzzle.onFail) queue.push(node.puzzle.onFail);
  }
}
const unreachable = nodes.filter(n => !visited.has(n));
if (unreachable.length) warnings.push(`不可达节点: ${unreachable.join(", ")}`);

console.log(`共 ${nodes.length} 个剧情节点`);
console.log(`可达节点: ${visited.size}`);
if (warnings.length) {
  console.log("\n⚠️ Warnings:");
  warnings.forEach(w => console.log("  -", w));
}
if (errors.length) {
  console.log(`\n❌ Errors (${errors.length}):`);
  errors.forEach(e => console.log("  -", e));
  process.exit(1);
} else {
  console.log("\n✅ 所有节点跳转、资源引用检查通过");
}
