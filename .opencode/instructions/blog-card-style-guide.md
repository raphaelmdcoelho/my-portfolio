# Blog card style guide

Blog cards are rendered by `src/components/ui/BlogCard.astro` and driven exclusively by data from `src/data/blog.ts`. To add a new card, only edit `blog.ts` — never touch the component itself.

## Data entry — `src/data/blog.ts`

Each entry in the `blogPosts` array must follow the `BlogPost` interface:

```ts
{
  id: string;       // kebab-case slug, must be unique (also used as the URL path segment)
  title: string;    // displayed as the card heading
  date: string;     // YYYY-MM-DD — use the actual date the entry was created
  excerpt: string;  // 1–3 sentence summary shown on the card
  url: string;      // full site-relative path: '/my-portfolio/blog/<id>'
  tags?: string[];  // short labels, 1–4 words each, 1–4 tags recommended
}
```

**Example:**

```ts
{
  id: 'my-new-post',
  title: 'My New Post Title',
  date: '2026-05-01',
  excerpt: 'A short description of what this post covers, in one to three sentences.',
  url: '/my-portfolio/blog/my-new-post',
  tags: ['Tag1', 'Tag2'],
},
```

## Field rules

| Field | Rule |
|---|---|
| `id` | Kebab-case, lowercase, no special chars. Must match the slug in `url`. |
| `title` | Sentence case. No trailing punctuation. |
| `date` | **Always the date the entry was created** (today's date), in `YYYY-MM-DD` format. Never use the original Medium publication date unless the post was created on the same day. |
| `excerpt` | Plain text only — no HTML or markdown. 1–3 sentences. Should complement the title, not repeat it. |
| `url` | Always prefixed with `/my-portfolio/blog/`. Must match `id`. |
| `tags` | Array of short strings. Use title case (e.g. `'C#'`, `'DevOps'`, `'Linux'`). Keep to 4 or fewer tags. |

## What the card renders

The `BlogCard` component automatically renders from the data above. No layout or style changes are needed. For reference, the card displays:

- **Date** — formatted as `Month Day, Year` (e.g. `May 1, 2026`) in `var(--color-accent)` (`#00ffe0`), monospace font.
- **Tags** — each tag rendered as a `.tag` pill (surface background, muted text, subtle border).
- **Title** — monospace bold, `var(--color-text)` (`#e5e5e5`).
- **Excerpt** — sans-serif, `var(--color-muted)` (`#888888`).
- **"Read more" link** — accent-colored arrow link pointing to `url`.
- **Hover state** — card lifts (`translateY(-3px)`), border turns accent, and a soft teal overlay appears.

## Date formatting note

The card formats `date` using `new Date(year, month - 1, day)` split from the `YYYY-MM-DD` string — **never** `new Date(post.date)` directly. This is already handled inside `BlogCard.astro`. You only need to supply the correct `YYYY-MM-DD` string in `blog.ts`.
