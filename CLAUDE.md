@AGENTS.md

## Projects

- Every project added to `src/data/projects.ts` must have its own thumbnail in `public/images/`. Never reuse another project's image (or a shared placeholder) for `imageUrl`.

## Workflow

- For every request that changes files, finish by committing the changes and opening a pull request against `main`. Do not wait to be asked.

## Agent skills

### Issue tracker

Issues live in GitHub Issues on `raphaelmdcoelho/my-portfolio` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
