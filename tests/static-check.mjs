import { readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");

const checks = [];
const assert = (condition, message) => {
  checks.push({ ok: Boolean(condition), message });
};

const index = read("index.html");
const engine = read("js/engine.js");
const css = read("css/style.css");
const data = read("js/data.js");

assert(index.includes("backlog-screen"), "index.html should contain Backlog overlay");
assert(index.includes("settings-screen"), "index.html should contain Settings overlay");
assert(index.includes("q-backlog"), "quick menu should expose history button");
assert(index.includes("q-auto"), "quick menu should expose auto button");
assert(index.includes("q-skip"), "quick menu should expose skip button");
assert(index.includes("q-settings"), "quick menu should expose settings button");

assert(engine.includes("appendHistory"), "engine should append dialogue lines into history");
assert(engine.includes("renderBacklog"), "engine should render Backlog");
assert(engine.includes("toggleAuto"), "engine should implement Auto mode");
assert(engine.includes("toggleSkip"), "engine should implement Skip mode");
assert(engine.includes("readLineKeys"), "engine should persist/read already-read line keys");
assert(engine.includes("gotoNode(data.node"), "load should resume from saved node");
assert(engine.includes("lineIdx"), "save data should include line index");

assert(css.includes("#backlog-screen"), "style.css should style Backlog");
assert(css.includes("#settings-screen"), "style.css should style Settings");
assert(css.includes("../assets/title.jpg"), "title screen should use generated key art");
assert(engine.includes("appendHistory"), "engine should append dialogue lines into history");

[
  "assets/chihua_cut.png",
  "assets/qingye_normal_cut.png",
  "assets/qingye_soft_cut.png",
  "assets/qingye_cold_cut.png",
  "assets/qingye_shock_cut.png",
  "assets/bg_office.jpg",
  "assets/bg_palace_night.jpg",
  "assets/bg_room.jpg",
  "assets/bg_hall.jpg",
  "assets/bg_banquet.jpg",
  "assets/title.jpg",
  "assets/clue_incense.png",
  "assets/clue_guard.png",
  "assets/clue_music.png",
  "assets/clue_wine.png",
  "assets/clue_moon.png",
  "assets/clue_sister.png",
].forEach((path) => {
  assert(existsSync(join(root, path)), `${path} should exist`);
  assert(statSync(join(root, path)).size > 50_000, `${path} should be a real generated image, not a placeholder`);
});

assert(data.includes(".jpg"), "data.js should reference JPG backgrounds");
assert(data.includes("_cut.png"), "sprite mapping should use transparent cutout PNGs");
assert(data.includes("img:true"), "puzzle clues should use custom generated images");
assert(!/assets\/[^"']+\.svg/.test(index + engine + css + data), "runtime files should not reference fallback SVG assets");

const failed = checks.filter((item) => !item.ok);
if (failed.length) {
  console.error(`Static check failed: ${failed.length} issue(s)`);
  for (const item of failed) console.error(`- ${item.message}`);
  process.exit(1);
}

console.log(`Static check passed: ${checks.length} checks`);
