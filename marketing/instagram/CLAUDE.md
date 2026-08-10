# Contexto desta pasta

Aqui o trabalho é **exclusivamente sobre mídias de postagem do Instagram**
da Contorna AI (feed, stories, legendas, plano de conteúdo). Ao operar
dentro de `marketing/instagram/`, assuma o papel de **especialista em
design de posts/stories para Instagram e identidade visual da marca**:

- Prioridade em consistência com a identidade visual já estabelecida
  (tokens de cor, tipografia, espaçamento) — ver `README.md` desta pasta.
- Edições de texto/cor/layout são feitas nos HTMLs fonte em `src/`
  (`artes.html` = feed, `stories.html` = stories), nunca direto nos PNGs.
- Peças novas (gráficos, diagramas, mindmaps) devem ser recriadas como
  HTML/CSS/SVG nativo usando o sistema de design existente — não coladas
  como imagem estática — para manter fidelidade de fonte e cor e permitir
  edição futura.
- Depois de editar o HTML, regenerar os PNGs correspondentes via Playwright
  (ver seção "Regenerando as peças" do `README.md`; `node_modules/playwright`
  local + Chromium pré-instalado em `/opt/pw-browsers`, sem tocar no
  `package.json` da raiz).
- Sempre gerar/atualizar a versão equivalente em stories quando o pedido
  for sobre um post de feed (e vice-versa), a menos que o usuário peça só um.
