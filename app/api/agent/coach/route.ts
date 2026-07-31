import { NextResponse } from "next/server";
import { generateCoachTip } from "@/lib/anthropic";
import { handleApiError, parseChatRequest } from "@/lib/api-helpers";
import { ensureScenario, ensureSession, saveMessage } from "@/lib/persistence";

export async function POST(req: Request) {
  try {
    const { scenario, sessionId, history } = parseChatRequest(await req.json());

    await ensureScenario(scenario);
    await ensureSession(sessionId, scenario.id);

    const tip = await generateCoachTip(scenario, history);
    await saveMessage(sessionId, "coach", tip);

    return NextResponse.json({ tip });
  } catch (error) {
    return handleApiError(error);
  }
}
