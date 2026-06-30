// scripts/selfcheck.js —— 多视口自检截图
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const VIEWPORTS = [
  { name: "desktop_1280", w: 1280, h: 720, mobile: false },
  { name: "phone_390", w: 390, h: 844, mobile: true },
  { name: "phone_se", w: 375, h: 667, mobile: true },
  { name: "phone_max", w: 430, h: 932, mobile: true },
];

(async () => {
  const outDir = path.join(__dirname, "..", "screenshots");
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    console.log(`\n== ${vp.name} (${vp.w}x${vp.h}) ==`);
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h },
      deviceScaleFactor: 1,
      isMobile: vp.mobile,
      hasTouch: vp.mobile,
      userAgent: vp.mobile ? "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)" : undefined,
    });
    const page = await ctx.newPage();

    // ====== Scene 1: 标题页 ======
    await page.goto("http://localhost:8799/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: path.join(outDir, `${vp.name}__01_title.png`) });
    console.log("  ✓ title");

    // ====== Scene 2: 入局推进对话到有立绘（点30次足够穿过现代场景进入古代） ======
    await page.click("#btn-start");
    await page.waitForTimeout(600);
    const cx = Math.floor(vp.w / 2);
    const cy = Math.floor(vp.h * 0.6);
    for (let i = 0; i < 55; i++) {
      await page.mouse.click(cx, cy);
      await page.waitForTimeout(380);
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, `${vp.name}__02_sprite.png`) });
    console.log("  ✓ sprite scene");

    // ====== Scene 3: 设置弹层 ======
    await page.click("#q-settings");
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outDir, `${vp.name}__03_settings.png`) });
    console.log("  ✓ settings");
    await page.click("#btn-settings-close").catch(()=>{});
    await page.waitForTimeout(300);

    await ctx.close();
  }

  await browser.close();
  console.log(`\n截图输出: ${outDir}`);
})();
