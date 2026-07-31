import Link from "next/link";

const objections: [string, string][] = [
  ["tá caro", "e comparado a não resolver isso, quanto custa continuar do jeito que tá?"],
  ["vou pensar", "o que exatamente falta pra você decidir agora, e não daqui a 3 meses?"],
  ["já uso outro fornecedor", "o que faria você trocar, se não fosse o preço?"],
  ["preciso falar com meu sócio", "o que ele vai perguntar que eu ainda não respondi?"],
  ["não é prioridade agora", "o que precisa acontecer pra virar prioridade — e quando isso acontece?"],
  ["manda uma proposta que eu vejo", "prefiro fechar os detalhes com você agora, pra proposta já vir certa. tem 5 minutos?"],
];

function MarqueeSet() {
  return (
    <>
      {objections.map(([obj, fix]) => (
        <span className="marquee-item" key={obj}>
          <span className="obj">&quot;{obj}&quot;</span>
          <span className="arrow">→</span>
          <span className="fix">&quot;{fix}&quot;</span>
          <span className="sep">///</span>
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
      </div>

      <nav className="glass">
        <div className="logo">
          <span className="dot" />
          contorno
        </div>
        <Link className="nav-cta" href="/simulate">
          Testar grátis
        </Link>
      </nav>

      <section className="hero wrap">
        <div className="eyebrow">DEVOPSIA · TREINO DE VENDAS COM IA</div>
        <h1>
          O CLIENTE <span className="strike">NÃO</span>
          <br />
          VIRA <span className="win">SIM</span> ANTES
          <br />
          DAS 9H.
        </h1>
        <p className="hero-sub">
          A IA finge ser o cliente mais difícil do seu mercado — e um segundo agente te sussurra o que dizer, em
          tempo real, antes do &quot;vou pensar&quot; virar desculpa de novo.
        </p>
        <div className="hero-cta">
          <Link className="btn-signal" href="/simulate">
            Treinar minha equipe →
          </Link>
          <Link className="btn-outline" href="/simulate">
            Ver simulação ao vivo
          </Link>
        </div>
      </section>

      <div className="marquee-wrap glass">
        <div className="marquee mono">
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>

      <section className="paper">
        <div className="wrap">
          <div className="stat-card glass">
            <div className="stat-num">
              73<sup>%</sup>
            </div>
            <div className="paper-copy">
              <p>
                dos vendedores travam na <strong>mesma objeção</strong> há mais de seis meses — porque o único
                treino que tiveram foi o gestor lendo um script uma vez, no onboarding.
              </p>
              <span className="cite">— com base em levantamento do setor de sales enablement, 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="how wrap">
        <div className="section-head">
          <div className="section-kicker">COMO FUNCIONA</div>
          <h2>Três agentes. Uma conversa. Nenhuma desculpa.</h2>
        </div>

        <div className="steps">
          <div className="step glass">
            <div className="step-num mono">01</div>
            <div className="step-body">
              <h3>A IA vira o cliente que te derruba</h3>
              <p>
                Persona configurada com o perfil, tom e objeções reais do seu setor — não um roteiro genérico de
                call center.
              </p>
            </div>
            <div className="mock">
              <div className="mock-line">
                <span className="mock-tag">cliente</span>
                <div className="mock-bubble">
                  &quot;O valor tá bem acima do que eu pago hoje. Não sei se vale a diferença.&quot;
                </div>
              </div>
            </div>
          </div>

          <div className="step glass">
            <div className="step-num mono">02</div>
            <div className="step-body">
              <h3>Um segundo agente sussurra a saída</h3>
              <p>
                Enquanto você responde, o coach analisa a conversa e te orienta sem interromper — texto ou voz,
                sua escolha.
              </p>
            </div>
            <div className="mock">
              <div className="mock-line">
                <span className="mock-tag">coach</span>
                <div className="mock-bubble coach">
                  Não entre no preço ainda. Pergunte o que pesa mais na comparação.
                </div>
              </div>
            </div>
          </div>

          <div className="step glass">
            <div className="step-num mono">03</div>
            <div className="step-body">
              <h3>Sai número, não opinião de gestor</h3>
              <p>Cada sessão vira relatório: onde travou, onde recuperou, e o que treinar amanhã de manhã.</p>
            </div>
            <div className="mock">
              <div className="mock-line">
                <span className="mock-tag">relatório</span>
                <div className="mock-bubble you">
                  Fechamento: 41%. Ponto cego: você não explorou &quot;fornecedor atual&quot;.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof wrap">
        <div className="section-head">
          <div className="section-kicker">QUEM JÁ USA</div>
          <h2>O gestor não precisa mais ouvir ligação pra saber quem travou.</h2>
        </div>
        <div className="proof-grid">
          <div className="wa-card glass">
            <div className="wa-head">
              <div className="wa-avatar" />
              <div>
                <div className="wa-name">Head de vendas · rede de clínicas</div>
                <div className="wa-role">time de 14 SDRs</div>
              </div>
            </div>
            <div className="wa-bubble">
              time inteiro treinando 15min por dia antes de bater o telefone. a objeção de preço parou de assustar
            </div>
          </div>
          <div className="wa-card glass">
            <div className="wa-head">
              <div className="wa-avatar" />
              <div>
                <div className="wa-name">Gestora comercial · farma B2B</div>
                <div className="wa-role">onboarding de novatos</div>
              </div>
            </div>
            <div className="wa-bubble">
              rampa de vendedor novo caiu de 6 semanas pra 3. eles chegam na call real já tendo apanhado da IA
              umas 10 vezes
            </div>
          </div>
          <div className="wa-card glass">
            <div className="wa-head">
              <div className="wa-avatar" />
              <div>
                <div className="wa-name">Sócio · distribuidora regional</div>
                <div className="wa-role">time de 6 vendedores</div>
              </div>
            </div>
            <div className="wa-bubble">
              o relatório mostrou que 4 dos 6 travavam no mesmo ponto. isso eu nunca ia descobrir ouvindo call
            </div>
          </div>
        </div>
      </section>

      <section className="final wrap" id="final">
        <div className="final-card glass glass-strong">
          <h2>
            Pare de perder venda
            <br />
            pro mesmo <span className="win">&quot;não&quot;</span> de sempre.
          </h2>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn-signal" href="/simulate">
              Começar agora, é grátis →
            </Link>
          </div>
        </div>
      </section>

      <footer className="glass">
        <div className="logo">
          <span className="dot" />
          contorno
        </div>
        <div className="fine">DEVOPSIA © 2026 — TREINO DE VENDAS COM IA</div>
      </footer>
    </>
  );
}
