import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const nome = typeof body.nome === "string" ? body.nome.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
  const whatsapp = typeof body.whatsapp === "string" ? body.whatsapp.trim().slice(0, 40) : "";
  const empresa = typeof body.empresa === "string" ? body.empresa.trim().slice(0, 160) : "";
  const tamanhoTime = typeof body.tamanhoTime === "string" ? body.tamanhoTime.slice(0, 20) : "";

  if (!nome || !email) {
    return NextResponse.json({ error: "Nome e e-mail são obrigatórios." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    // Sem banco configurado não há onde guardar o lead — falhar alto é
    // melhor que aceitar e perder o contato silenciosamente.
    console.error("[leads] Supabase não configurado; lead recusado:", email);
    return NextResponse.json(
      { error: "Cadastro temporariamente indisponível. Tente de novo em instantes." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("leads").insert({
    nome,
    email,
    whatsapp: whatsapp || null,
    empresa: empresa || null,
    tamanho_time: tamanhoTime || null,
  });

  if (error) {
    // 23505 = unique_violation: e-mail já cadastrado conta como sucesso pro visitante
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }
    console.error("[leads]", error.message);
    return NextResponse.json(
      { error: "Não foi possível salvar seu cadastro. Tente de novo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
