/**
 * Gera todas as peças de Instagram a partir dos HTMLs desta pasta.
 *
 *   node render.js            # tudo
 *   node render.js feed       # só as artes de feed (1080x1350 + perfil)
 *   node render.js stories    # só os stories (1080x1920)
 *   node render.js reels      # só as capas de Reels (1080x1920) + ícones de destaque (1080x1080)
 *   node render.js pdf        # só o PDF do plano
 *
 * Requer Playwright com Chromium:  npm i -D playwright && npx playwright install chromium
 * Saídas vão para ../feed, ../stories, ../reels, ../destaques e ../ (o PDF).
 */
const path = require("path");
const { chromium } = require("playwright");

const SRC = __dirname;
const OUT = path.resolve(SRC, "..");
const url = (f) => "file://" + path.join(SRC, f);

const FEED = {
  profile: "feed/contorna-perfil-1080x1080.png",
  p1: "feed/post1-teaser.png",
  p2: "feed/post2-lancamento.png",
  p3: "feed/post3-como-funciona.png",
  p4: "feed/post4-mercados.png",
  p5: "feed/post5-cta.png",
  p6: "feed/post6-bastidor.png",
  car1: "feed/carrossel1-capa.png",
  car2: "feed/carrossel2-tacaro.png",
  car3: "feed/carrossel3-voupensar.png",
  car4: "feed/carrossel4-socio.png",
  car5: "feed/carrossel5-email.png",
  car6: "feed/carrossel6-cta.png",
};

const STORIES = {
  s1: "stories/story1-teaser.png",
  s2: "stories/story2-lancamento.png",
  s3: "stories/story3-como-funciona.png",
  s4: "stories/story4-mercados.png",
  s5: "stories/story5-cta.png",
};

const REELS = {
  reel1: "reels/reel1-tacaro.png",
  reel2: "reels/reel2-voupensar.png",
  reel3: "reels/reel3-comofunciona.png",
};

const DESTAQUES = {
  dest1: "destaques/destaque1-comece-aqui.png",
  dest2: "destaques/destaque2-objecoes.png",
  dest3: "destaques/destaque3-como-funciona.png",
  dest4: "destaques/destaque4-mercados.png",
  dest5: "destaques/destaque5-bastidor.png",
};

/** Espera as webfonts carregarem e falha alto se alguma não subiu. */
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

async function shootBoards(browser, file, map, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(url(file), { waitUntil: "networkidle" });
  await waitFonts(page);
  for (const [id, dest] of Object.entries(map)) {
    const el = await page.$("#" + id);
    if (!el) throw new Error(`#${id} não encontrado em ${file}`);
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    await el.screenshot({ path: path.join(OUT, dest) });
    console.log("  ✓", dest);
  }
  await page.close();
}

async function buildPdf(browser) {
  const page = await browser.newPage();
  await page.goto(url("plano.html"), { waitUntil: "networkidle" });
  await waitFonts(page);
  const dest = "Contorna-AI-Plano-de-Conteudo-Instagram.pdf";
  await page.pdf({
    path: path.join(OUT, dest),
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  console.log("  ✓", dest);
  await page.close();
}

(async () => {
  const alvo = process.argv[2] || "all";
  const browser = await chromium.launch();
  try {
    if (alvo === "all" || alvo === "feed") {
      console.log("feed:");
      await shootBoards(browser, "artes.html", FEED, { width: 1200, height: 1500 });
    }
    if (alvo === "all" || alvo === "stories") {
      console.log("stories:");
      await shootBoards(browser, "stories.html", STORIES, { width: 1200, height: 2000 });
    }
    if (alvo === "all" || alvo === "reels") {
      console.log("reels:");
      await shootBoards(browser, "reels-destaques.html", REELS, { width: 1200, height: 2000 });
      console.log("destaques:");
      await shootBoards(browser, "reels-destaques.html", DESTAQUES, { width: 1200, height: 1200 });
    }
    // o PDF embute as artes, então roda por último
    if (alvo === "all" || alvo === "pdf") {
      console.log("pdf:");
      await buildPdf(browser);
    }
  } finally {
    await browser.close();
  }
})();
