# EVOLUÇÃO

Ideias para evoluir o portfólio, em ordem de prioridade sugerida. Cada item traz o objetivo, o que fazer e onde mexer, para que possa ser retomado a qualquer momento.

## Antes de começar qualquer item

- Conteúdo e textos vivem em `src/data/` e `src/i18n/ui.ts`. Tudo é bilíngue (EN e PT): todo texto novo precisa existir nos dois idiomas.
- Tema apenas escuro, cor de destaque `#00ffe0`. Não adicionar estilos de tema claro.
- Cada projeto em `src/data/projects.ts` precisa de thumbnail própria em `public/images/` (ver `CLAUDE.md`).
- Verificação manual, pois não há testes nem CI: `npm run astro -- check && npm run build`.
- Costume de trabalho: uma branch e um PR por mudança, a partir da `main`.

## Prioridade alta

### 1. Experiência profissional (linha do tempo)

**Por quê:** hoje o site mostra o que você constrói, mas não onde nem com quem. É a maior lacuna para recrutadores.

**O que fazer**
- Criar `src/data/experience.ts` com uma lista tipada (`Experience`): empresa, cargo (`Localized`), período, descrição/resultados (`Localized`, 2 a 3 pontos) e tecnologias.
- Criar `src/components/sections/Experience.astro` (linha do tempo vertical, usando `.section`, `.section-title` e `.section-divider` do `global.css`).
- Adicionar a seção em `src/pages/[...lang]/index.astro`, entre Skills e Projects, e o link no menu (`Navbar.astro`).
- Traduções do título e rótulos em `src/i18n/ui.ts`.

**Pronto quando:** aparece em EN e PT, funciona no celular, e o item do menu fica destacado ao rolar.

### 2. Currículo para baixar (PDF)

**Por quê:** é o que recrutadores procuram primeiro.

**O que fazer**
- Colocar `curriculo-pt.pdf` e `resume-en.pdf` em `public/`.
- Botão "Baixar currículo" / "Download résumé" no Hero e/ou no Contact, apontando para o arquivo do idioma atual (`getLang`).
- Rótulos em `ui.ts`; usar o atributo `download` no link.

**Pronto quando:** cada idioma baixa o PDF correto. Lembrar de atualizar os PDFs quando o currículo mudar.

### 3. Estudos de caso dos projetos

**Por quê:** a descrição curta não mostra seu raciocínio. Um texto por projeto (problema, decisões, desafios, resultado) é o que diferencia.

**O que fazer**
- Começar pelos 2 ou 3 melhores projetos (por exemplo Mero e grass-ds).
- Criar a rota `src/pages/[...lang]/projects/[slug].astro` seguindo o padrão do blog (`getStaticPaths` para EN e PT).
- Adicionar um campo opcional no tipo `Project` (por exemplo `caseStudy?: Localized`) e, no showcase (`ProjectCarousel.tsx`), um botão "Ver estudo de caso" apenas nos projetos que tiverem.
- Escrever com poucas seções fixas: Contexto, Desafio, Solução, Resultado, Aprendizados.

**Pronto quando:** o botão só aparece onde há estudo de caso e a página volta para a lista de projetos.

## Prioridade média

### 4. Evoluir o blog

- **Content Collections + MDX:** é o caminho já previsto no `AGENTS.md`. Hoje cada artigo é um bloco escrito à mão em `blog/[slug].astro`; migrar permite escrever em Markdown e abre as próximas ideias.
- **Tempo de leitura:** só é possível depois da migração (hoje não há corpo de texto para medir).
- **Índice dentro do artigo, artigos relacionados e RSS** (`@astrojs/rss`).
- **Mais artigos:** a página de blog só ganha força com mais conteúdo (hoje são 2).
- Seguir o guia de estilo em `.opencode/instructions/blog-article-style-guide.md`.

### 5. Formulário de contato real

**O que fazer:** adicionar um formulário (nome, e-mail, mensagem) na seção Contact usando um serviço externo (Formspree, Resend etc.), com estados de envio, sucesso e erro, e textos em EN e PT.

**Atenção:** como o site é estático, não guarde chaves secretas no código do navegador; usar o endpoint público que o serviço fornece.

### 6. SEO e compartilhamento

- Imagem Open Graph por página (e por artigo) e metadados `og:` / `twitter:` no `Layout.astro`.
- `sitemap.xml` (`@astrojs/sitemap`; lembrar do `site` e do `base: '/my-portfolio'` no `astro.config`).
- Tags `hreflang` ligando as versões EN e PT de cada página.
- Dados estruturados (JSON-LD de `Person` e de `BlogPosting`).

**Pronto quando:** o link do site mostra bem no LinkedIn e no WhatsApp.

## Prioridade baixa (personalidade)

### 7. Página "Now"

Uma página curta com o que você está estudando, construindo e lendo agora. Dados em `src/data/now.ts` (com data da última atualização), rota `src/pages/[...lang]/now.astro`.

### 8. Skills conectadas aos projetos

Em vez de uma lista simples, mostrar em quais projetos cada tecnologia aparece (clicar numa skill filtra ou destaca os projetos). Os dados já existem: `tags` em `projects.ts` e a lista em `config.ts`.

### 9. Formação e certificações

Seção compacta, apenas se fizer sentido para o seu perfil. Pode ser parte da página de experiência.

### 10. Depoimentos

Duas ou três frases de colegas, com nome, cargo e permissão para publicar. Só vale a pena se você tiver quem escreva.

## Melhorias técnicas e de qualidade

- Revisar acessibilidade: contraste, foco visível, navegação por teclado no showcase de projetos.
- Testar o site no celular (muitas verificações até aqui foram só no desktop).
- Otimizar imagens: algumas thumbnails têm 2 a 3 MB. Usar `astro:assets` ou comprimir (WebP/AVIF) melhora o carregamento.
- Remover arquivos não usados em `public/images/` (`poster.png`, `poster.svg`, `physical-thumbnail.png`) e o componente `ProjectCard.astro`, que ficaram órfãos.
- Corrigir os pontos de "Known gaps" do `AGENTS.md` conforme forem sendo resolvidos (por exemplo, a pasta `public/images/` já existe agora).

## Ordem sugerida

1. Experiência profissional
2. Currículo em PDF
3. Estudos de caso (2 ou 3 projetos)
4. SEO e compartilhamento
5. Migração do blog para MDX + mais artigos
6. O restante, conforme o interesse
