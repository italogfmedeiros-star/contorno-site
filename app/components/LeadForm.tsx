"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nome: String(data.get("nome") || "").trim(),
      email: String(data.get("email") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      empresa: String(data.get("empresa") || "").trim(),
      tamanhoTime: String(data.get("tamanhoTime") || ""),
    };

    if (!payload.nome || !payload.email) {
      setErrorMsg("Preencha pelo menos nome e e-mail.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || "Não foi possível enviar. Tente de novo.");
      setStatus("success");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="lead-success">
        <div className="ok-dot">✓</div>
        <h3>Recebido. Você está na fila.</h3>
        <p>
          Vamos te chamar no e-mail (ou WhatsApp, se você deixou) pra liberar o acesso do seu time à
          primeira turma.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <label>
        NOME
        <input name="nome" type="text" placeholder="Seu nome" autoComplete="name" required />
      </label>
      <label>
        E-MAIL DE TRABALHO
        <input name="email" type="email" placeholder="voce@empresa.com.br" autoComplete="email" required />
      </label>
      <label>
        WHATSAPP <span style={{ fontWeight: 400 }}>(opcional)</span>
        <input name="whatsapp" type="tel" placeholder="(11) 90000-0000" autoComplete="tel" />
      </label>
      <label>
        EMPRESA
        <input name="empresa" type="text" placeholder="Nome da empresa" autoComplete="organization" />
      </label>
      <label className="full">
        TAMANHO DO TIME COMERCIAL
        <select name="tamanhoTime" defaultValue="">
          <option value="" disabled>
            Selecione…
          </option>
          <option value="1-5">1 a 5 vendedores</option>
          <option value="6-15">6 a 15 vendedores</option>
          <option value="16-50">16 a 50 vendedores</option>
          <option value="50+">Mais de 50</option>
        </select>
      </label>

      {status === "error" && errorMsg && <div className="lead-error full">{errorMsg}</div>}

      <button className="btn-signal lead-submit full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Quero acesso antecipado →"}
      </button>
      <div className="lead-fine full">
        Sem spam. Usamos seus dados só pra falar sobre o Contorno — e você pode pedir remoção quando quiser.
      </div>
    </form>
  );
}
