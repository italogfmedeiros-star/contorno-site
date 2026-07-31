"use client";

import { useEffect, useRef, useState } from "react";
import { scenarios, type Scenario } from "@/lib/scenarios";
import type { ChatMessage, ReportPayload } from "@/lib/types";

type Phase = "pick" | "chat" | "loading-report" | "report";

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || "Algo deu errado na simulação.");
  }
  return data as T;
}

export default function Simulator() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [coachTip, setCoachTip] = useState<string | null>(null);
  const [coachLoading, setCoachLoading] = useState(false);
  const [report, setReport] = useState<ReportPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function startScenario(s: Scenario) {
    setScenario(s);
    setSessionId(crypto.randomUUID());
    setMessages([{ role: "cliente", content: s.aberturaCliente }]);
    setCoachTip(null);
    setReport(null);
    setError(null);
    setPhase("chat");
  }

  async function handleSend() {
    if (!scenario || !sessionId || !input.trim() || sending) return;

    const nextHistory: ChatMessage[] = [...messages, { role: "vendedor", content: input.trim() }];
    setMessages(nextHistory);
    setInput("");
    setSending(true);
    setCoachLoading(true);
    setError(null);

    const payload = { scenarioId: scenario.id, sessionId, history: nextHistory };

    const clientePromise = postJSON<{ reply: string }>("/api/agent/cliente", payload)
      .then(({ reply }) => {
        setMessages((prev) => [...prev, { role: "cliente", content: reply }]);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setSending(false));

    const coachPromise = postJSON<{ tip: string }>("/api/agent/coach", payload)
      .then(({ tip }) => setCoachTip(tip))
      .catch(() => setCoachTip(null))
      .finally(() => setCoachLoading(false));

    await Promise.all([clientePromise, coachPromise]);
  }

  async function handleEndSession() {
    if (!scenario || !sessionId) return;
    setPhase("loading-report");
    setError(null);
    try {
      const { report } = await postJSON<{ report: ReportPayload }>("/api/agent/report", {
        scenarioId: scenario.id,
        sessionId,
        history: messages,
      });
      setReport(report);
      setPhase("report");
    } catch (err) {
      setError((err as Error).message);
      setPhase("chat");
    }
  }

  function resetAll() {
    setPhase("pick");
    setScenario(null);
    setSessionId(null);
    setMessages([]);
    setCoachTip(null);
    setReport(null);
    setError(null);
  }

  return (
    <div className="simulator">
      {error && (
        <div className="glass" style={{ padding: "14px 18px", color: "var(--signal)", fontSize: 14, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {phase === "pick" && (
        <div className="persona-grid">
          {scenarios.map((s) => (
            <button key={s.id} className="persona-card glass" onClick={() => startScenario(s)}>
              <span className="persona-tag">{s.tag}</span>
              <h3>
                {s.nome} · {s.setor}
              </h3>
              <p>{s.resumo}</p>
            </button>
          ))}
        </div>
      )}

      {phase === "chat" && scenario && (
        <>
          <div className="sim-controls">
            <span className="sim-live mono">
              EM SESSÃO · {scenario.nome.toUpperCase()} · {scenario.tag}
            </span>
            <button className="btn-outline" onClick={handleEndSession} disabled={messages.length < 2}>
              Encerrar e ver relatório →
            </button>
          </div>
          <div className="chat-layout">
            <div className="chat-panel glass">
              <div className="chat-scroll" ref={scrollRef}>
                {messages.map((m, i) => (
                  <div key={i} className={`msg ${m.role === "cliente" ? "msg-cliente" : "msg-vendedor"}`}>
                    <span className="msg-role mono">{m.role === "cliente" ? scenario.nome : "você"}</span>
                    {m.content}
                  </div>
                ))}
                {sending && (
                  <div className="msg msg-cliente" style={{ color: "var(--text-dim)", fontStyle: "italic" }}>
                    digitando…
                  </div>
                )}
              </div>
              <div className="chat-input">
                <textarea
                  rows={2}
                  placeholder="Digite sua resposta para o cliente…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button className="btn-signal" onClick={handleSend} disabled={sending || !input.trim()}>
                  Enviar
                </button>
              </div>
            </div>

            <div className="coach-panel glass">
              <h4>AGENTE COACH</h4>
              {coachLoading && <div className="coach-tip pending">analisando sua resposta…</div>}
              {!coachLoading && coachTip && <div className="coach-tip">{coachTip}</div>}
              {!coachLoading && !coachTip && (
                <div className="coach-tip pending">responda o cliente para receber a primeira dica.</div>
              )}
            </div>
          </div>
        </>
      )}

      {phase === "loading-report" && (
        <div className="glass" style={{ padding: 40, textAlign: "center", color: "var(--text-dim)" }}>
          Gerando seu relatório…
        </div>
      )}

      {phase === "report" && report && scenario && (
        <div className="report-card glass">
          <div className="sim-controls" style={{ marginBottom: 18 }}>
            <span className="section-kicker" style={{ marginBottom: 0 }}>
              RELATÓRIO · {scenario.nome.toUpperCase()}
            </span>
            <button className="btn-outline" onClick={resetAll}>
              Nova simulação
            </button>
          </div>
          <div className="report-score">
            {report.scoreGeral}
            <span style={{ fontSize: "0.4em", color: "var(--text-dim)" }}>/100</span>
          </div>

          <div className="report-grid">
            <div className="report-stat">
              <div className="n">{report.categorias.quebraObjecao}</div>
              <div className="l">quebra de objeção</div>
            </div>
            <div className="report-stat">
              <div className="n">{report.categorias.escutaAtiva}</div>
              <div className="l">escuta ativa</div>
            </div>
            <div className="report-stat">
              <div className="n">{report.categorias.tentativaFechamento}</div>
              <div className="l">tentativa de fechamento</div>
            </div>
            <div className="report-stat">
              <div className="n">{report.categorias.tomRitmo}</div>
              <div className="l">tom / ritmo</div>
            </div>
          </div>

          <div className="report-insights">
            <div className="report-insight">
              <span className="k k-forte mono">PONTO FORTE</span>
              {report.insights.pontoForte}
            </div>
            <div className="report-insight">
              <span className="k k-melhoria mono">PONTO DE MELHORIA</span>
              {report.insights.pontoMelhoria}
            </div>
            <div className="report-insight">
              <span className="k k-cego mono">PONTO CEGO</span>
              {report.insights.pontoCego}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
