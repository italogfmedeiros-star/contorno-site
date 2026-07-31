import { NextResponse } from "next/server";
import { generateReport } from "@/lib/anthropic";
import { handleApiError, parseChatRequest } from "@/lib/api-helpers";
import { ensureScenario, ensureSession, finalizeSession } from "@/lib/persistence";

export async function POST(req: Request) {
  try {
    const { scenario, sessionId, history } = parseChatRequest(await req.json());

    await ensureScenario(scenario);
    await ensureSession(sessionId, scenario.id);

    const report = await generateReport(scenario, history);
    await finalizeSession(sessionId, report);

    return NextResponse.json({ report });
  } catch (error) {
    return handleApiError(error);
  }
}
