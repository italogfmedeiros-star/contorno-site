export type TipoObjecao = "preco" | "concorrencia" | "vou_pensar";

export type Scenario = {
  id: string;
  nome: string;
  setor: string;
  tipoObjecao: TipoObjecao;
  dificuldade: "media" | "alta";
  tag: string;
  resumo: string;
  tom: string;
  contexto: string;
  aberturaCliente: string;
};

/**
 * Biblioteca inicial de personas (escopo §5.1). Fase 1 do roadmap usa
 * apenas uma persona por vez, escolhida pelo vendedor em /simulate.
 */
export const scenarios: Scenario[] = [
  {
    id: "preco-clinica",
    nome: "Renata Alves",
    setor: "Rede de clínicas estéticas",
    tipoObjecao: "preco",
    dificuldade: "media",
    tag: "OBJEÇÃO · PREÇO",
    resumo: "Compara tudo pelo custo-benefício e já tem um fornecedor mais barato na mesa.",
    tom: "cordial, direta, decide com planilha na mão — não se emociona fácil com o pitch",
    contexto:
      "Renata é sócia-gerente de uma rede de 4 clínicas estéticas. Hoje paga um valor mensal " +
      "abaixo do que está sendo oferecido por uma ferramenta concorrente mais simples. Ela já " +
      "ouviu esse tipo de pitch antes e sabe pedir números concretos (ROI, tempo de implementação, " +
      "o que perde se não trocar). Só amolece se o vendedor conectar o preço a uma perda real que " +
      "ela reconhece no próprio negócio, não a benefícios genéricos.",
    aberturaCliente:
      "Olha, eu já dei uma olhada na proposta. O valor tá bem acima do que eu pago hoje na ferramenta " +
      "que uso. Não sei se realmente vale a diferença.",
  },
  {
    id: "concorrencia-farma",
    nome: "Marcos Tadeu",
    setor: "Distribuidora farmacêutica B2B",
    tipoObjecao: "concorrencia",
    dificuldade: "alta",
    tag: "OBJEÇÃO · CONCORRÊNCIA",
    resumo: "Fechado com o fornecedor atual há 3 anos e sem paciência para trocar sem um motivo forte.",
    tom: "direto, um pouco impaciente, protege a relação que já tem",
    contexto:
      "Marcos é gestor comercial e trabalha com o mesmo fornecedor há 3 anos — tem contrato, " +
      "relacionamento e conhece os defeitos do fornecedor atual, mas prefere 'o ruim conhecido'. " +
      "Ele interrompe pitches genéricos e só presta atenção quando o vendedor nomeia um problema " +
      "específico que ele já sente na operação atual (SLA, suporte, integração), sem atacar o " +
      "fornecedor diretamente.",
    aberturaCliente:
      "Eu já uso outro fornecedor há uns 3 anos. Funciona, tenho contrato rodando. Não vejo motivo " +
      "forte pra mudar agora, sinceramente.",
  },
  {
    id: "vou-pensar-distribuidora",
    nome: "Juliana Prado",
    setor: "Distribuidora regional de eletrônicos",
    tipoObjecao: "vou_pensar",
    dificuldade: "media",
    tag: "OBJEÇÃO · \"VOU PENSAR\"",
    resumo: "Evita confronto, adia toda decisão e usa 'vou pensar' como saída educada.",
    tom: "simpática, evasiva, não gosta de dizer não na cara — prefere sumir depois",
    contexto:
      "Juliana é gerente comercial e evita conflito. Raramente diz 'não' diretamente — prefere " +
      "'vou pensar', 'preciso alinhar com o time' ou 'me manda por e-mail'. Ela só se compromete " +
      "com um próximo passo concreto se o vendedor descobrir, com perguntas, o que exatamente está " +
      "por trás da hesitação (medo de errar, falta de orçamento aprovado, prioridade em outra área).",
    aberturaCliente:
      "Olha, gostei do que você mostrou. Deixa eu pensar com calma e te retorno, pode ser?",
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((s) => s.id === id);
}
