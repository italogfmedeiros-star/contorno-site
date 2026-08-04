import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { getScenarioById, type Scenario } from "./scenarios";
import type { ChatMessage } from "./types";

/**
 * Erro cuja mensagem foi escrita para ser lida por quem está usando o produto.
 * Só o que é lançado como ApiError chega à tela — ver handleApiError.
 */
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type ParsedChatRequest = {
  scenario: Scenario;
  sessionId: string;
  history: ChatMessage[];
};

export function parseChatRequest(body: unknown): ParsedChatRequest {
  if (typeof body !== "object" || body === null) {
    throw new ApiError(400, "Corpo da requisição inválido.");
  }
  const { scenarioId, sessionId, history } = body as Record<string, unknown>;

  if (typeof scenarioId !== "string" || !scenarioId) {
    throw new ApiError(400, "scenarioId é obrigatório.");
  }
  if (typeof sessionId !== "string" || sessionId.length < 8) {
    throw new ApiError(400, "sessionId é obrigatório.");
  }
  if (!Array.isArray(history)) {
    throw new ApiError(400, "history deve ser uma lista de mensagens.");
  }

  const scenario = getScenarioById(scenarioId);
  if (!scenario) {
    throw new ApiError(404, `Cenário "${scenarioId}" não encontrado.`);
  }

  const parsedHistory: ChatMessage[] = history.map((item) => {
    if (typeof item !== "object" || item === null) {
      throw new ApiError(400, "Mensagem inválida em history.");
    }
    const { role, content } = item as Record<string, unknown>;
    if (role !== "cliente" && role !== "vendedor") {
      throw new ApiError(400, "role inválido em history.");
    }
    if (typeof content !== "string" || !content.trim()) {
      throw new ApiError(400, "content inválido em history.");
    }
    return { role, content };
  });

  return { scenario, sessionId, history: parsedHistory };
}

/**
 * Converte uma exceção em resposta HTTP.
 *
 * A mensagem de um erro qualquer é escrita para quem mantém o sistema, não
 * para quem está tentando vender: "ANTHROPIC_API_KEY não configurada" já
 * apareceu num balão vermelho no meio da simulação. Só ApiError — cuja
 * mensagem foi redigida para o visitante — chega à tela. O resto vira texto
 * genérico, e o detalhe fica no log do servidor.
 */
export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  // Falha da API da Anthropic: o texto original é interno, mas o status diz o
  // que interessa ao visitante — se vale a pena tentar de novo agora.
  if (error instanceof Anthropic.APIError) {
    console.error("[api] anthropic", error.status, error.message);
    const emFila = error.status === 429 || (error.status ?? 500) >= 500;
    return NextResponse.json(
      {
        error: emFila
          ? "A simulação está com fila agora. Tente de novo em alguns segundos."
          : "Não foi possível falar com a IA agora. Tente de novo em instantes.",
      },
      { status: 503 }
    );
  }

  console.error("[api]", error instanceof Error ? (error.stack ?? error.message) : error);
  return NextResponse.json(
    { error: "Algo deu errado do nosso lado. Tente de novo em instantes." },
    { status: 500 }
  );
}
