# Blog article style guide

All blog post content lives inside `src/pages/blog/[slug].astro`. Each post is a hardcoded block
gated by `post.id`. Follow the rules below when adding a new article so every post looks consistent.

## Layout & wrapper

```html
<div class="article-body space-y-14" style="margin-top: 3rem;">
  <!-- one <section> per logical topic -->
</div>
```

- `space-y-14` provides the vertical gap between sections (3.5 rem).
- `margin-top: 3rem` separates the body from the author byline.
- Each logical topic is wrapped in a `<section>` tag with no extra classes.

## Section headings (h2)

```html
<h2 class="font-mono font-bold text-xl mb-4" style="color: var(--color-text);">
  Heading Title 🔥
</h2>
```

- Font: monospace (`font-mono`), bold, `text-xl` (1.25 rem).
- Color: `var(--color-text)` — the main light text color (`#e5e5e5`).
- Bottom margin: `mb-4` (1 rem).
- Top margin is handled globally by `.article-body h2 { margin-top: 3rem }` in the page `<style>` block — do not add `mt-*` to individual headings.
- Emojis at the end of the heading title are encouraged but optional.

## Body paragraphs

```html
<p class="leading-relaxed mb-4" style="color: var(--color-muted);">
  Paragraph text here.
</p>
```

- Color: `var(--color-muted)` (`#888888`).
- Line height: `leading-relaxed`.
- Spacing between consecutive paragraphs: `mb-4` on all but the last one.

## Inline emphasis

| Element | Classes / style | Purpose |
|---|---|---|
| `<strong>` | `style="color: var(--color-text);"` | Bold key term, brighter than body text |
| `<code>` | _(no extra classes needed)_ | Inline code; styled globally in `<style>` block — monospace, accent color, subtle border |

## Bullet lists

```html
<ul class="space-y-3">
  <li class="flex gap-3">
    <span style="color: var(--color-accent);">▸</span>
    <span style="color: var(--color-muted);">
      <span class="font-semibold" style="color: var(--color-text);">Term:</span> Description text.
    </span>
  </li>
</ul>
```

- Bullet marker: `▸` in `var(--color-accent)` (`#00ffe0`).
- Item spacing: `space-y-3` (0.75 rem) for regular lists, `space-y-4` for longer items.
- Term label (optional): `font-semibold` + `var(--color-text)`, followed by a colon.
- Description: `var(--color-muted)`.

## Code blocks

```html
<div class="code-block rounded-xl overflow-x-auto mb-8"
     style="background: var(--color-surface); border: 1px solid var(--color-border);">
  <!-- Optional header label -->
  <div class="code-header flex items-center gap-2 px-4 py-2 font-mono text-xs"
       style="color: var(--color-accent); border-bottom: 1px solid var(--color-border);">
    <span>// optional label</span>
  </div>
  <pre class="p-5 font-mono text-sm leading-relaxed overflow-x-auto"
       style="color: var(--color-text);"><code>// code here</code></pre>
</div>
```

- Background: `var(--color-surface)` (`#111111`).
- Border: `1px solid var(--color-border)` (`#2a2a2a`).
- Corner radius: `rounded-xl`.
- Padding inside `<pre>`: `p-5`.
- Font: `font-mono text-sm leading-relaxed`.
- Text color: `var(--color-text)`.
- The optional header bar uses `var(--color-accent)` text and a bottom border.
- Spacing around a block: `mb-8` after, `mt-*` only when needed (the `.article-body .code-block` scoped rule already adds `margin-top: 2rem`).
- In Astro, curly braces inside `<code>` must be escaped as `{'{'}` and `{'}'}`.

## Figures / diagrams

```html
<figure class="my-10 flex flex-col items-center gap-3">
  <img
    src="/my-portfolio/images/blog/your-image.png"
    alt="Descriptive alt text"
    class="rounded-xl w-full"
    style="border: 1px solid var(--color-border); max-width: 600px;"
  />
  <figcaption class="font-mono text-xs text-center" style="color: var(--color-muted);">
    Caption text
  </figcaption>
</figure>
```

- Vertical margin: `my-10`.
- Image: `rounded-xl`, max width 600 px, border `var(--color-border)`.
- Caption: monospace, `text-xs`, centered, `var(--color-muted)`.

## Inline comment labels (accent annotations)

Use these above a code block to label it as a best-practice or note:

```html
<p class="font-mono text-sm mb-8" style="color: var(--color-accent);">// Best practices</p>
```

## Colors reference

| Token | Value | Usage |
|---|---|---|
| `var(--color-text)` | `#e5e5e5` | Headings, strong terms, code block text |
| `var(--color-muted)` | `#888888` | Body paragraphs, list descriptions, captions |
| `var(--color-accent)` | `#00ffe0` | Bullet markers, inline code, accent labels, borders on hover |
| `var(--color-surface)` | `#111111` | Code block background |
| `var(--color-border)` | `#2a2a2a` | Code block and image borders |

## Fonts reference

| Token | Stack | Usage |
|---|---|---|
| `var(--font-mono)` / `font-mono` | JetBrains Mono, Fira Code, Cascadia Code | Headings, code, labels, captions |
| `var(--font-sans)` / _(default)_ | Inter, system-ui | Body paragraphs |

## Adding a new post — checklist

1. Add an entry to `src/data/blog.ts` (`id`, `title`, `date` as `YYYY-MM-DD`, `excerpt`, `url`, `tags`).
2. In `[slug].astro`, add a new `const isXxxPost = post.id === 'your-slug';` variable.
3. Add a new conditional block `{isXxxPost ? ( ... ) : null}` (or extend the existing ternary chain) following the structure above.
4. Use `new Date(year, month - 1, day)` (split from the `YYYY-MM-DD` string) for date formatting — **never** `new Date(post.date)` directly, as that parses as UTC and causes off-by-one day errors in local timezones.
