/**
 * Gera todas as peças de Instagram a partir dos HTMLs desta pasta.
 *
 *   node render.js            # tudo
 *   node render.js feed       # só as artes de feed (1080x1350 + perfil)
 *   node render.js stories    # só os stories (1080x1920)
 *   node render.js pdf        # só o PDF do plano
 *
 * Requer Playwright com Chromium:  npm i -D playwright && npx playwright install chromium
 * Saídas vão para ../feed, ../stories e ../ (o PDF).
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
};

const CARROSSEL = {
  c1: "carrossel/slide1-capa.png",
  c2: "carrossel/slide2-ta-caro.png",
  c3: "carrossel/slide3-vou-pensar.png",
  c4: "carrossel/slide4-socio.png",
  c5: "carrossel/slide5-email.png",
  c6: "carrossel/slide6-cta.png",
};

const REELS = {
  r1: "reels/capa1-ta-caro.png",
  r2: "reels/capa2-vou-pensar.png",
  r3: "reels/capa3-a-nota.png",
  h1: "reels/destaque1-comece-aqui.png",
  h2: "reels/destaque2-objecoes.png",
  h3: "reels/destaque3-como-funciona.png",
  h4: "reels/destaque4-mercados.png",
  h5: "reels/destaque5-bastidor.png",
};

const AVULSOS = {
  a1: "avulsos/story-bastidor-pessoal.png",
};

const STORIES = {
  s1: "stories/story1-teaser.png",
  s2: "stories/story2-lancamento.png",
  s3: "stories/story3-como-funciona.png",
  s4: "stories/story4-mercados.png",
  s5: "stories/story5-cta.png",
};

/**
 * Espera as webfonts carregarem e falha alto se alguma não subiu.
 *
 * O navegador só busca as faces que a página realmente usa, então `check`
 * sozinho acusaria falta numa página que não usa aquele peso — as capas de
 * destaque, por exemplo, não têm texto nenhum. `load` força a busca antes,
 * e aí a verificação só reprova o que de fato não existe.
 */
async function waitFonts(page) {
  const ESPECIMES = {
    bricolage: '800 40px "Bricolage Grotesque"',
    inter: '600 20px "Inter"',
    plex: '500 20px "IBM Plex Mono"',
  };
  await page.evaluate(() => document.fonts.ready);
  const ok = await page.evaluate(async (especimes) => {
    const res = {};
    for (const [nome, spec] of Object.entries(especimes)) {
      await document.fonts.load(spec);
      res[nome] = document.fonts.check(spec);
    }
    return res;
  }, ESPECIMES);
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
  // CHROMIUM_PATH permite usar um Chromium já instalado na máquina, quando o
  // que o Playwright espera não é o que está disponível.
  const browser = await chromium.launch(
    process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
  );
  try {
    if (alvo === "all" || alvo === "feed") {
      console.log("feed:");
      await shootBoards(browser, "artes.html", FEED, { width: 1200, height: 1500 });
    }
    if (alvo === "all" || alvo === "carrossel") {
      console.log("carrossel:");
      await shootBoards(browser, "carrossel.html", CARROSSEL, { width: 1200, height: 1500 });
    }
    if (alvo === "all" || alvo === "stories") {
      console.log("stories:");
      await shootBoards(browser, "stories.html", STORIES, { width: 1200, height: 2000 });
    }
    if (alvo === "all" || alvo === "avulsos") {
      console.log("avulsos:");
      await shootBoards(browser, "avulsos.html", AVULSOS, { width: 1200, height: 2000 });
    }
    if (alvo === "all" || alvo === "reels") {
      console.log("reels:");
      await shootBoards(browser, "reels.html", REELS, { width: 1200, height: 2000 });
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
