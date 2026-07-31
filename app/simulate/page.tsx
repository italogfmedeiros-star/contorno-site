import { redirect } from "next/navigation";

// A simulação agora vive embutida na landing page (seção #simulacao).
// A rota antiga é mantida como redirect para não quebrar links existentes.
export default function SimulatePage() {
  redirect("/#simulacao");
}
