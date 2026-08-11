/**
 * Gera o PDF do manual de marca a partir do HTML desta pasta.
 *
 *   node render.js
 *
 * Requer Playwright com Chromium:  npm i -D playwright && npx playwright install chromium
 * Saída vai para ../Contorna-AI-Manual-de-Marca.pdf
 */
const path = require("path");
const { chromium } = require("playwright");

const SRC = __dirname;
const OUT = path.resolve(SRC, "..");
const url = (f) => "file://" + path.join(SRC, f);

async function waitFonts(page) {
  await page.evaluate(() => document.fonts.ready);
  const ok = await page.evaluate(() => ({
    bricolage: document.fonts.check('800 40px "Bricolage Grotesque"'),
    inter: document.fonts.check('600 20px "Inter"'),
    plex: document.fonts.check('500 20px "IBM Plex Mono"'),
  }));
  const faltando = Object.entries(ok).filter(([, v]) => !v).map(([k]) => k);
  if (faltando.length) throw new Error("fontes não carregaram: " + faltando.join(", "));
}

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url("manual-de-marca.html"), { waitUntil: "networkidle" });
    await waitFonts(page);
    const dest = "Contorna-AI-Manual-de-Marca.pdf";
    await page.pdf({
      path: path.join(OUT, dest),
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    console.log("✓", dest);
    await page.close();
  } finally {
    await browser.close();
  }
})();
