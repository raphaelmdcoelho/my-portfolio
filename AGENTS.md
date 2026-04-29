# AGENTS.md

Compact ramp-up guide for AI agents working in this repo.

## Project

Personal portfolio site built with **Astro v6** + **React** (islands) + **Tailwind CSS v4**.
Single package, no monorepo. Node `>=22.12.0` required.

## Commands

```sh
npm install             # install deps
npm run dev             # dev server → http://localhost:4321
npm run build           # production build → ./dist/
npm run preview         # preview production build locally
npm run astro -- check  # type-check .astro + .ts files (no named script for this)
```

There are **no test, lint, or format scripts**. The only automated verification is:

```sh
npm run astro -- check  # run before considering a change complete
npm run build           # catches broken imports and type errors too
```

## Architecture

```
src/
  data/         ← single source of truth for ALL content
    config.ts   ← name, bio, social links, skills
    projects.ts ← projects array (typed Project interface)
    blog.ts     ← blog posts array (typed BlogPost interface)
  components/
    layout/     ← Layout.astro, Navbar.astro, Footer.astro
    sections/   ← one .astro per page section (Hero, About, Projects, Skills, Blog, Contact)
    ui/         ← BlogCard, ProjectCard, SkillBadge
  pages/
    index.astro         ← assembles all sections
    blog/[slug].astro   ← dynamic route; pulls from src/data/blog.ts via getStaticPaths()
  styles/
    global.css  ← Tailwind v4 @import + @theme block + custom utility classes
```

**To change any text or data, edit `src/data/` — not the components.**

## Toolchain quirks

- **Tailwind v4**: configured as a Vite plugin (`@tailwindcss/vite`). There is no `tailwind.config.*` file — this is intentional. Theme tokens (colors, fonts) live in the `@theme {}` block inside `src/styles/global.css`.
- **CSS conventions**: layout/spacing use Tailwind classes; theme colors use CSS custom properties (`var(--color-accent)`, etc.) via inline `style=""`. Do not replace these with Tailwind color classes unless you add them to `@theme`.
- **Reusable utilities**: `.glow`, `.glow-box`, `.grid-bg`, `.content-wrap`, `.section`, `.section-title`, `.section-divider` are defined in `global.css` — use them instead of duplicating styles.
- **`.astro/types.d.ts` is auto-generated** and gitignored. After a fresh clone, run `npm run dev` or `npm run build` once before type-checking works in `.astro` files.
- **React islands**: Framer Motion (`framer-motion` v12) is installed for animations; it requires React components with a `client:*` directive in Astro files.
- **Dark-only theme**: `color-scheme: dark`. Accent color is `#00ffe0`. Do not add light-mode styles.

## Known gaps (do not treat as bugs to fix unless asked)

- `public/images/` does not exist — `config.avatar` (`/images/avatar.jpg`) and project images will be broken until those files are added.
- Blog post content is stub-only (renders `excerpt` + placeholder). The intended upgrade path is Astro Content Collections + MDX.

## No CI or pre-commit hooks

Zero automated quality gates. Run `npm run astro -- check && npm run build` manually to verify changes.
