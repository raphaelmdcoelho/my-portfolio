---
name: raphael-blog-style
description: Write or rewrite blog post text in Raphael Coelho's personal writing style (tutorial-like, analogy-driven, emoji-tagged headings). Use when drafting, editing or translating any article for this portfolio's blog, in English or Portuguese (pt-BR).
---

# Raphael's blog writing style

Derived from the two existing posts: *How does Stream work in C#?* and *Accessing Windows Directories from Linux*. Match these traits; do not invent a wittier or more "internet-y" voice than the originals.

## Voice

- **Friendly teacher, not stand-up comedian.** Explanatory and tutorial-like. Humor is light and mostly lives in the analogies and the emojis, not in punchlines.
- **Second person and inclusive "we":** "you can read or write data…", "we'll focus on…", "let's first dive into…", "So let's talk about it 🧠". Never first-person anecdotes ("I once…").
- **Moderately formal, fluent English.** Medium-to-long sentences, connected by "However,", "For example,", "In this example,", "Another important aspect is…". Em dashes with spaces (` — `) for asides.
- **No hype, no invented numbers or sources.** Claims are plain and defensible ("can be more complex", "might not be supported").

## Structure of a post

1. **Opening (2–3 paragraphs, no heading).** Start from the real-world problem or context ("In a mixed operating system environment…", "Streams are a fundamental concept…"). Say what the article will cover. End the intro with a bridge sentence: "Before demonstrating how to set this up, let's first dive into some foundational concepts…" or "So let's talk about it 🧠".
2. **Concept sections first, then practice.** Define the concept, give an analogy, then show code or steps, then explain the code.
3. **Short sections.** Each `##` section is 1–3 short paragraphs plus at most one list or code block.
4. **Conclusion 🏁.** One paragraph that recaps what was learned, uses "By understanding…, you can…" phrasing, states the practical value, and may include one inline emoji (e.g. "this powerful 💪 concept").

## Headings

- Title Case, usually **ending in exactly one emoji** that fits the topic: `Benefits of Using Streams 👍`, `Potential Drawbacks of Streams 👎`, `Visualizing Streams 🧐`, `What is Mount on Linux? 🐧`, `Creating the Mount with a Credentials File 🔐`, `Conclusion 🏁`.
- Concept sections are often phrased as questions: `What is a File System? 🗄`, `What is CIFS? 🌐`, `What is fstab? ⚙️`.
- Procedures use `Step N: Verb the Thing` sub-headings (no emoji): `Step 1: Install CIFS Utilities`.
- Pros and cons get their own paired sections (Benefits 👍 / Potential Drawbacks 👎) with three bullets each.

## Analogies (the signature move)

Explain every core abstraction with a concrete everyday analogy, introduced explicitly and then mapped term by term:

- "A helpful analogy for understanding streams is to think of them as faucets… In this analogy, a **buffer** acts like a bucket… the **cursor** … the faucet's valve."
- "A good analogy to understand mounting is to think of a house… adding a new file system is like adding a new room… you need a doorway — analogous to the **mount point**."

Pattern: *"A good/helpful analogy … is to think of X as Y. In this analogy, A is B, C is D."* Then place the figure right after the explanation. One strong analogy per post beats several weak ones. Funny images are welcome, but the text must carry the explanation on its own.

## Terms, lists and emphasis

- Bold a key term the first time it is defined (**mount point**, **buffer**). Use `code` for identifiers, commands, flags and file names.
- Bullet items follow `Term: description.` (bold-ish label, colon, one or two sentences). Three to five items; a sentence or two each, never a paragraph.
- For command arguments, explain each part in its own bullet ("The first argument … is…, The `-t` option specifies…").
- Use a labeled `Note:` or a "For security, … isn't recommended" aside when there is a pitfall.
- Mention drawbacks honestly ("Complexity", "Error Handling") instead of only selling the topic.

## Code

- Introduce each code block with one sentence ("Here's an example of …:").
- Follow it with a paragraph starting "In this example, we …" that walks through what happens and why.
- Label blocks with a short comment header (`// FileStream read example`, `// Best practices`, `// Step 2 — lock down the file`).
- Keep samples small and runnable-looking; show the "good practice" variant explicitly.

## Language and translation

- Every article exists in **English and Portuguese (pt-BR)**. The Portuguese version is a faithful, natural translation (not word-for-word): same structure, same headings with the same emoji, same analogies. Keep technical terms (stream, buffer, mount point, prompt) as developers actually say them in Brazil.
- Headings in Portuguese stay in Title Case style of the existing posts ("Benefícios de Usar Streams 👍").

## Length and rhythm

- About 900–1,500 words for a concept-plus-practice article. Paragraphs of 2–4 sentences; never walls of text, never a string of one-line paragraphs.
- Sections alternate: explanation → analogy/figure → example → short list.

## Do not

- Do not open with a joke, a rhetorical shouting match, or a story about "you typed…".
- Do not use cards, tables or long numbered strategy essays when a short bullet list does the job.
- Do not stack multiple emojis in a heading or sprinkle them per sentence; at most one per heading plus the occasional one in the intro/conclusion.
- Do not use filler like "game-changer", "supercharge", "in today's fast-paced world".

## Reference

HTML structure, colors and component classes for the page are in `.opencode/instructions/blog-article-style-guide.md`. This skill only covers the **writing**; put figure placeholders as `[FIGURE: file-name | alt text | caption]` lines in the draft so the layout can be applied afterwards. See the existing posts in `src/pages/[...lang]/blog/[slug].astro` for the real thing.
