import LeadForm from "./components/LeadForm";
import Mark from "./components/Mark";
import Simulator from "./components/Simulator";

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

      <nav>
        <div className="nav-inner">
          <div className="logo">
            <Mark size={22} />
            Contorna AI
          </div>
          <div className="nav-links">
            <a href="#problema">O problema</a>
            <a href="#produto">O produto</a>
            <a href="#inteligencia">Inteligência</a>
            <a href="#desempenho">Desempenho</a>
            <a href="#simulacao">Simulação</a>
          </div>
          <a className="nav-cta" href="#simulacao">
            Testar agora
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero wrap">
        <div className="eyebrow">DEVOPSIA · INTELIGÊNCIA DE OBJEÇÕES EM VENDAS</div>
        <h1>
          O CLIENTE <span className="strike">NÃO</span>
          <br />
          VIRA <span className="win">SIM</span>.
          <br />A GENTE MUDA ISSO.
        </h1>
        <p className="hero-sub">
          O Contorna AI trata a objeção como o ativo central da venda: treina seu time contra o cliente mais
          difícil do seu mercado, sopra a resposta certa na hora H e transforma cada &quot;não&quot; em dado
          que aumenta a taxa de fechamento do próximo negócio.
        </p>
        <div className="hero-cta">
          <a className="btn-signal" href="#simulacao">
            Treinar agora, de graça →
          </a>
          <a className="btn-outline" href="#produto">
            Ver como funciona
          </a>
        </div>
      </section>

      <div className="marquee-wrap glass">
        <div className="marquee mono">
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>

      {/* PROBLEMA */}
      <section className="how wrap" id="problema">
        <div className="section-head">
          <div className="section-kicker">O PROBLEMA</div>
          <h2>Toda venda quebra no mesmo lugar: a objeção.</h2>
        </div>
        <div className="pain-grid">
          <div className="pain-card glass">
            <div className="n">ANTES DA VENDA</div>
            <h3>Sem onde treinar</h3>
            <p>
              O vendedor pratica objeção no cliente real — e queima pipeline. O único treino que teve foi o
              gestor lendo um script uma vez, no onboarding.
            </p>
          </div>
          <div className="pain-card glass">
            <div className="n">DURANTE A VENDA</div>
            <h3>Sozinho na hora H</h3>
            <p>
              Quando a objeção aparece ao vivo, a melhor resposta existe em algum lugar do time — mas não na
              cabeça dele naquele segundo.
            </p>
          </div>
          <div className="pain-card glass">
            <div className="n">DEPOIS DA VENDA</div>
            <h3>Tudo se perde</h3>
            <p>
              As objeções que mataram negócios evaporam. Ninguém sabe dizer quais mais matam, em qual perfil
              de cliente, nem o que o melhor vendedor respondeu pra virar o jogo.
            </p>
          </div>
        </div>
      </section>

      {/* STAT */}
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

      {/* PRODUTO */}
      <section className="how wrap" id="produto">
        <div className="section-head">
          <div className="section-kicker">O PRODUTO</div>
          <h2>Três frentes. Do treino ao fechamento.</h2>
        </div>

        <div className="steps">
          <div className="step glass">
            <div className="step-num mono">01</div>
            <div className="step-body">
              <h3>O Treinador</h3>
              <p>
                A IA vira o cliente que te derruba. Seu time treina vendendo pra ela — em texto ou voz, do
                nível fácil ao impossível — e sai de cada sessão com nota, pontos cegos e um plano de treino
                pro dia seguinte.
              </p>
              <div className="tags">
                <span className="tag">texto e voz</span>
                <span className="tag">dica em tempo real</span>
                <span className="tag">nota por sessão</span>
              </div>
            </div>
            <div className="mock">
              <div className="mock-line">
                <span className="mock-tag">cliente</span>
                <div className="mock-bubble">
                  &quot;Tá bem acima do que pago hoje. Não sei se vale a diferença.&quot;
                </div>
              </div>
              <div className="mock-line">
                <span className="mock-tag">coach</span>
                <div className="mock-bubble coach">
                  Não entre no preço ainda. Pergunte o que pesa mais na comparação.
                </div>
              </div>
            </div>
          </div>

          <div className="step glass">
            <div className="step-num mono">02</div>
            <div className="step-body">
              <h3>O Copiloto ao vivo</h3>
              <p>
                Na conversa real com o cliente, o Contorna AI detecta a objeção na hora e sussurra a saída na
                tela do vendedor. A resposta do melhor closer do time, disponível pra todo mundo, em tempo
                real.
              </p>
              <div className="tags">
                <span className="tag">na venda real</span>
                <span className="tag">resposta na tela</span>
                <span className="tag">privacidade garantida</span>
              </div>
            </div>
            <div className="mock">
              <div className="mock-line">
                <span className="mock-tag">cliente</span>
                <div className="mock-bubble">&quot;Preciso falar com meu sócio antes de decidir.&quot;</div>
              </div>
              <div className="mock-line">
                <span className="mock-tag">ao vivo</span>
                <div className="mock-bubble coach">
                  Objeção de autoridade. Pergunte: &quot;o que ele vai perguntar que eu ainda não
                  respondi?&quot;
                </div>
              </div>
            </div>
          </div>

          <div className="step glass">
            <div className="step-num mono">03</div>
            <div className="step-body">
              <h3>O Closer autônomo</h3>
              <p>
                Uma IA humanizada que conduz a venda sozinha — contorna objeção, qualifica e avança o negócio
                por texto ou voz. Não é chatbot de FAQ: é um closer treinado no jeito que a sua empresa vende.
              </p>
              <div className="tags">
                <span className="tag">vende sozinho</span>
                <span className="tag">inbound 24/7</span>
                <span className="tag">com as suas regras</span>
              </div>
            </div>
            <div className="mock">
              <div className="mock-line">
                <span className="mock-tag">cliente</span>
                <div className="mock-bubble">&quot;Vou pensar e te retorno.&quot;</div>
              </div>
              <div className="mock-line">
                <span className="mock-tag">closer</span>
                <div className="mock-bubble you">
                  &quot;Faz sentido. Só pra eu não te deixar no escuro: o que exatamente falta pra decidir
                  hoje, e não daqui a 3 meses?&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULAÇÃO */}
      <section className="how wrap" id="simulacao" style={{ paddingTop: 20 }}>
        <div className="section-head">
          <div className="section-kicker">SIMULAÇÃO · TESTE AGORA</div>
          <h2>Apanhe da IA aqui, antes do cliente de verdade.</h2>
        </div>
        <Simulator />
      </section>

      {/* INTELIGÊNCIA */}
      <section className="how wrap" id="inteligencia" style={{ paddingTop: 20 }}>
        <div className="section-head">
          <div className="section-kicker">INTELIGÊNCIA COMERCIAL</div>
          <h2>Cada &quot;não&quot; vira número na mesa do gestor.</h2>
        </div>
        <div className="intel-grid">
          <div className="intel-card glass">
            <h3>
              Quais objeções <span style={{ color: "var(--signal)" }}>matam</span> seus negócios
            </h3>
            <p>Separando a objeção que só aparece da que de fato derruba a venda — no seu mercado.</p>
          </div>
          <div className="intel-card glass">
            <h3>
              O que <span style={{ color: "var(--win)" }}>funciona</span> contra cada uma
            </h3>
            <p>As respostas e analogias com maior taxa de virada, por objeção e por perfil de cliente.</p>
          </div>
          <div className="intel-card glass">
            <h3>Quem trava, e onde</h3>
            <p>
              Sem ouvir ligação gravada: o gestor vê quem treinou, quem evoluiu e em qual objeção cada
              vendedor ainda cai.
            </p>
          </div>
          <div className="intel-card glass">
            <h3>Quem está pronto pra fechar</h3>
            <p>Sinais da conversa viram score de propensão — seu time prioriza quem decide.</p>
          </div>
        </div>
      </section>

      {/* DESEMPENHO / PROVA */}
      <section className="proof wrap" id="desempenho">
        <div className="section-head">
          <div className="section-kicker">DESEMPENHO</div>
          <h2>O que muda quando o treino vira rotina.</h2>
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

      {/* CAPTURA */}
      <section className="final wrap" id="captura">
        <div className="lead-card glass glass-strong">
          <div className="section-kicker">LEVE PRO SEU TIME</div>
          <h2>
            Pare de perder venda pro mesmo{" "}
            <span className="strike">&quot;não&quot;</span> de sempre.
          </h2>
          <p className="lead-sub">
            A simulação acima é aberta e não pede cadastro. Se quiser levar pro time inteiro — com os
            cenários do seu produto e o painel do gestor — deixe seus dados que a gente monta seu ambiente.
            Sem cartão.
          </p>
          <LeadForm />
        </div>
      </section>

      <footer className="glass">
        <div className="logo">
          <Mark size={18} />
          Contorna AI
        </div>
        <div className="fine">DEVOPSIA © 2026 — INTELIGÊNCIA DE OBJEÇÕES EM VENDAS</div>
      </footer>
    </>
  );
}
