import { NextResponse } from "next/server";
import { getScenarioById, type Scenario } from "./scenarios";
import type { ChatMessage } from "./types";

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

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  const message = error instanceof Error ? error.message : "Erro inesperado.";
  console.error("[api]", message);
  return NextResponse.json({ error: message }, { status: 500 });
}
