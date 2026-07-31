export type ChatRole = "cliente" | "vendedor";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ReportPayload = {
  scoreGeral: number;
  categorias: {
    quebraObjecao: number;
    escutaAtiva: number;
    tentativaFechamento: number;
    tomRitmo: number;
  };
  insights: {
    pontoForte: string;
    pontoMelhoria: string;
    pontoCego: string;
  };
};
