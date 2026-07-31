import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;

/**
 * Cliente Supabase para uso exclusivo em rotas de servidor (app/api/**),
 * com a service role key (bypassa RLS). Retorna `null` quando as
 * variáveis de ambiente ainda não foram configuradas — a persistência é
 * best-effort: a simulação (Agente Cliente / Agente Coach) funciona sem
 * Supabase, só o histórico/relatório deixam de ser salvos.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (cachedClient !== undefined) return cachedClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
  return cachedClient;
}
