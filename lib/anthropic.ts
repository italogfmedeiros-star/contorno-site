import Anthropic from "@anthropic-ai/sdk";
import { ApiError } from "./api-helpers";
import { buildClienteSystemPrompt, buildCoachSystemPrompt, buildReportSystemPrompt, formatTranscript } from "./prompts";
import type { Scenario } from "./scenarios";
import type { ChatMessage, ReportPayload } from "./types";

const DEFAULT_MODEL = "claude-sonnet-5";

let cachedClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!cachedClient) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      // O visitante não tem o que fazer com o nome da variável — quem precisa
      // dele é quem opera o ambiente, e para esse o log serve.
      console.error(
        "[anthropic] ANTHROPIC_API_KEY não configurada; a simulação não vai responder."
      );
      throw new ApiError(
        503,
        "A simulação está temporariamente indisponível. Tente de novo em instantes."
      );
    }
    cachedClient = new Anthropic({ apiKey });
  }
  return cachedClient;
}

function model(): string {
  return process.env.ANTHROPIC_MODEL || DEFAULT_MODEL;
}

/** Agente Cliente: responde como a persona, dado o histórico da conversa. */
export async function generateClienteReply(scenario: Scenario, history: ChatMessage[]): Promise<string> {
  const client = getClient();

  const messages: Anthropic.MessageParam[] = history.map((m) => ({
    role: m.role === "vendedor" ? "user" : "assistant",
    content: m.content,
  }));

  const response = await client.messages.create({
    model: model(),
    max_tokens: 300,
    system: buildClienteSystemPrompt(scenario),
    messages: messages.length > 0 ? messages : [{ role: "user", content: "(o vendedor ainda não falou nada)" }],
  });

  return extractText(response);
}

/** Agente Coach: sussurra uma dica curta ao vendedor, sem entrar na conversa principal. */
export async function generateCoachTip(scenario: Scenario, history: ChatMessage[]): Promise<string> {
  const client = getClient();

  const transcript = formatTranscript(history);

  const response = await client.messages.create({
    model: model(),
    max_tokens: 150,
    system: buildCoachSystemPrompt(scenario),
    messages: [
      {
        role: "user",
        content: `Transcrição até agora:\n\n${transcript}\n\nDê a dica para o vendedor sobre a última fala dele.`,
      },
    ],
  });

  return extractText(response);
}

const REPORT_TOOL: Anthropic.Tool = {
  name: "submit_report",
  description: "Envia a avaliação estruturada da simulação de vendas.",
  input_schema: {
    type: "object",
    properties: {
      scoreGeral: { type: "integer", minimum: 0, maximum: 100 },
      categorias: {
        type: "object",
        properties: {
          quebraObjecao: { type: "integer", minimum: 0, maximum: 100 },
          escutaAtiva: { type: "integer", minimum: 0, maximum: 100 },
          tentativaFechamento: { type: "integer", minimum: 0, maximum: 100 },
          tomRitmo: { type: "integer", minimum: 0, maximum: 100 },
        },
        required: ["quebraObjecao", "escutaAtiva", "tentativaFechamento", "tomRitmo"],
      },
      insights: {
        type: "object",
        properties: {
          pontoForte: { type: "string" },
          pontoMelhoria: { type: "string" },
          pontoCego: { type: "string" },
        },
        required: ["pontoForte", "pontoMelhoria", "pontoCego"],
      },
    },
    required: ["scoreGeral", "categorias", "insights"],
  },
};

/** Agente de Relatório: avalia a sessão inteira e devolve score + insights estruturados. */
export async function generateReport(scenario: Scenario, history: ChatMessage[]): Promise<ReportPayload> {
  const client = getClient();
  const transcript = formatTranscript(history);

  const response = await client.messages.create({
    model: model(),
    max_tokens: 700,
    system: buildReportSystemPrompt(scenario),
    tools: [REPORT_TOOL],
    tool_choice: { type: "tool", name: "submit_report" },
    messages: [
      {
        role: "user",
        content: `Transcrição completa da simulação:\n\n${transcript}\n\nAvalie e envie o relatório.`,
      },
    ],
  });

  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );

  if (!toolUse) {
    console.error("[anthropic] relatório sem tool_use; stop_reason:", response.stop_reason);
    throw new ApiError(
      502,
      "Não consegui fechar o relatório dessa rodada. Encerre de novo em instantes."
    );
  }

  return toolUse.input as ReportPayload;
}

function extractText(response: Anthropic.Message): string {
  const textBlock = response.content.find((block): block is Anthropic.TextBlock => block.type === "text");
  return textBlock?.text?.trim() ?? "";
}
