# Contorno — Escopo do Projeto

**Produto:** Simulador de vendas com IA para treino de objeção
**Empresa:** Devopsia
**Status:** Concepção / pré-MVP
**Última atualização:** julho de 2026

---

## 1. Problema

Times de vendas treinam objeção de forma inconsistente: role-play esporádico com o gestor, script lido uma vez no onboarding, ou nenhum treino estruturado. O resultado é ramp-up lento de vendedores novos e vendedores experientes travando sempre no mesmo tipo de objeção (preço, concorrência, "vou pensar"), sem visibilidade de gestão sobre onde exatamente a conversa quebra.

## 2. Solução

Um agente de IA assume o papel de um cliente com objeções configuráveis por setor/persona. Enquanto o vendedor conversa com esse "cliente", um segundo agente (coach) observa a conversa e sugere ajustes em tempo real, sem interromper o fluxo. Ao final, o vendedor recebe um relatório com pontuação por categoria e pontos cegos identificados.

## 3. Público-alvo

- Times comerciais de pequeno/médio porte (5–50 vendedores) sem estrutura de enablement dedicada
- Gestores comerciais que hoje dependem de ouvir ligações gravadas manualmente para dar feedback
- Setores com objeções específicas de nicho (ex: farma/saúde, onde o Devopsia já tem domínio via Dermaflora)

## 4. Diferenciais frente ao mercado

- **Coaching duplo**: a maioria dos concorrentes (Second Nature, Hyperbound, Mindtickle) entrega relatório só ao final; poucos dão dica *durante* a simulação
- **Canal duplo desde o MVP**: texto e voz na mesma base de persona/coach, não dois produtos separados
- **Preço/acesso self-serve em BRL**: concorrência internacional trabalha com contrato anual via time comercial ("sales-led"), sem plano de entrada acessível
- **Nicho regulado**: pouca oferta brasileira madura para setores como farma/saúde, onde o Devopsia já tem contexto de domínio

## 5. Escopo funcional (MVP)

### 5.1 Cenários e personas
- Cadastro de cenário (tipo de objeção: preço, concorrência, "vou pensar", renovação)
- Cadastro de persona do cliente (nome, perfil, tom, dificuldade)
- Biblioteca inicial com 2–3 personas prontas para validar o produto

### 5.2 Simulação — canal texto
- Chat em tempo real entre vendedor e Agente Cliente
- Agente Coach analisa cada resposta do vendedor e injeta dica contextual na interface, sem travar a conversa
- Encerramento manual da sessão pelo vendedor

### 5.3 Simulação — canal voz
- Transcrição em streaming (STT) da fala do vendedor
- Resposta do Agente Cliente sintetizada em voz (TTS)
- Dicas do Coach exibidas como overlay textual na tela (não interrompem o áudio)

### 5.4 Relatório
- Score geral e por categoria (quebra de objeção, escuta ativa, tentativa de fechamento, tom/ritmo)
- Insights textuais: ponto forte, ponto de melhoria, ponto cego
- Histórico de sessões por vendedor

### 5.5 Painel do gestor (fase posterior ao MVP)
- Visão consolidada da equipe: quem treinou, quem travou, em qual objeção
- Ranking e evolução ao longo do tempo
- Criação de cenários customizados sem depender de suporte técnico

## 6. Arquitetura técnica

| Camada | Escolha | Observação |
|---|---|---|
| Frontend | Next.js | Consistente com stack Devopsia |
| Backend/dados | Supabase (Postgres) | Sessões, transcrições, cenários, scores |
| LLM — Agente Cliente | API Anthropic | Persona e objeções |
| LLM — Agente Coach | API Anthropic (chamada paralela, streaming) | Roda em paralelo à conversa principal |
| Voz | Vapi ou Retell AI (infraestrutura) | Não construir STT/TTS/telefonia do zero — meses de trabalho de engenharia que não agrega diferencial de produto |
| STT/TTS (se stack própria) | Deepgram (STT) + ElevenLabs (TTS) | Alternativa caso Vapi/Retell não cubram a necessidade |
| Deploy | Vercel | Consistente com stack Devopsia |

**Requisito de latência (canal voz):** manter round-trip abaixo de ~150–200ms para não quebrar a sensação de conversa real — usar transcrição em streaming, síntese de TTS concorrente e detecção de interrupção (barge-in).

## 7. Modelo de dados (rascunho)

```
scenarios      → persona, tipo de objeção, dificuldade
sessions       → cenário, vendedor, canal (texto/voz), status, timestamps
messages       → sessão, role (cliente/vendedor/coach), conteúdo, timestamp
reports        → sessão, score geral, score por categoria, insights
users          → vendedor, gestor, equipe/organização
```

## 8. Roadmap por fases

**Fase 1 — MVP texto**
1 persona, 1 tipo de objeção, coach ao vivo em texto + relatório final. Objetivo: validar se a dica em tempo real realmente muda o comportamento do vendedor na simulação.

**Fase 2 — Biblioteca e histórico**
Múltiplos cenários/personas, dashboard de histórico do vendedor, primeiras métricas de uso.

**Fase 3 — Voz**
Canal de voz via Vapi/Retell reaproveitando a mesma lógica de Agente Cliente e Agente Coach já validada em texto.

**Fase 4 — Painel de gestão**
Dashboard do gestor, ranking de equipe, criação de cenários customizados sem código.

## 9. Riscos e desafios conhecidos

- **"Scenario drift"**: relatos de concorrentes (Second Nature) sobre a IA mudar de comportamento de forma inconsistente dentro do mesmo cenário — mitigar com system prompt bem restrito por persona e testes de regressão de conversa
- **Latência em voz**: maior risco técnico do produto; validar em texto antes de investir em voz
- **Coaching genérico demais**: dica em tempo real só tem valor se for específica ao que o vendedor acabou de dizer, não um tip genérico de manual de vendas
- **Adoção**: ferramenta de treino compete com a rotina do vendedor; frequência curta e diária (10–15min) tende a funcionar melhor que sessões longas esporádicas

## 10. Métricas de sucesso do MVP

- Vendedor completa a simulação até o relatório final (não abandona no meio)
- Redução perceptível de hesitação/objeção mal respondida entre a 1ª e a 5ª sessão do mesmo vendedor
- Gestor considera o relatório mais útil que ouvir a ligação gravada manualmente

## 11. Em aberto

- Nome definitivo do produto (Contorno é hipótese de trabalho)
- Se será produto Devopsia independente ou módulo dentro de outro produto existente
- Modelo de precificação (self-serve por assento vs. pacote por equipe)
- Se o nicho farma/saúde será foco de lançamento ou generalista desde o início
