import { getSupabaseServerClient } from "./supabase/server";
import type { Scenario } from "./scenarios";
import type { ChatRole, ReportPayload } from "./types";

/**
 * Todas as funções aqui são best-effort: se o Supabase não estiver
 * configurado (ver lib/supabase/server.ts) elas viram no-ops silenciosos
 * em vez de derrubar a simulação. Erros de escrita são logados, nunca
 * propagados — persistência é acessória ao valor principal (coach ao
 * vivo + relatório), não um bloqueador do MVP.
 */

export async function ensureScenario(scenario: Scenario): Promise<void> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase.from("scenarios").upsert({
    id: scenario.id,
    nome: scenario.nome,
    setor: scenario.setor,
    tipo_objecao: scenario.tipoObjecao,
    dificuldade: scenario.dificuldade,
  });

  if (error) console.error("[persistence] ensureScenario:", error.message);
}

export async function ensureSession(sessionId: string, scenarioId: string): Promise<void> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase.from("sessions").upsert(
    {
      id: sessionId,
      scenario_id: scenarioId,
      canal: "texto",
      status: "em_andamento",
    },
    { onConflict: "id", ignoreDuplicates: true }
  );

  if (error) console.error("[persistence] ensureSession:", error.message);
}

export async function saveMessage(sessionId: string, role: ChatRole | "coach", content: string): Promise<void> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase.from("messages").insert({
    session_id: sessionId,
    role,
    content,
  });

  if (error) console.error("[persistence] saveMessage:", error.message);
}

export async function finalizeSession(sessionId: string, report: ReportPayload): Promise<void> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return;

  const { error: sessionError } = await supabase
    .from("sessions")
    .update({ status: "concluida", ended_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (sessionError) console.error("[persistence] finalizeSession/sessions:", sessionError.message);

  const { error: reportError } = await supabase.from("reports").insert({
    session_id: sessionId,
    score_geral: report.scoreGeral,
    score_categorias: report.categorias,
    insights: report.insights,
  });

  if (reportError) console.error("[persistence] finalizeSession/reports:", reportError.message);
}
