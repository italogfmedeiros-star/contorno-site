import { NextResponse } from "next/server";
import { generateClienteReply } from "@/lib/anthropic";
import { handleApiError, parseChatRequest } from "@/lib/api-helpers";
import { ensureScenario, ensureSession, saveMessage } from "@/lib/persistence";

export async function POST(req: Request) {
  try {
    const { scenario, sessionId, history } = parseChatRequest(await req.json());

    await ensureScenario(scenario);
    await ensureSession(sessionId, scenario.id);

    const lastMessage = history[history.length - 1];
    if (lastMessage?.role === "vendedor") {
      await saveMessage(sessionId, "vendedor", lastMessage.content);
    }

    const reply = await generateClienteReply(scenario, history);
    await saveMessage(sessionId, "cliente", reply);

    return NextResponse.json({ reply });
  } catch (error) {
    return handleApiError(error);
  }
}
