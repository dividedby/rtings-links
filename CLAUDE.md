# CLAUDE.md

## Project

A single userscript, `rtingsLinks.user.js`, that opens rtings.com's shopping links in a new tab while the current tab stays put. No build step and no dependencies. Behavior tests in `test/rtingsLinks.test.js` run the script against small hand-made fakes (Node's built-in runner): run plain `node --test` from the repo root (Node 22; CI runs the same on every push and PR). Installs and updates come from Greasy Fork (the `@updateURL`/`@downloadURL` in the header).

Format check: `pnpm format:check` (CI: `.github/workflows/format.yml`).

## Rules

- **Bump `@version` on every user-facing change**, or installed copies never update.
- Never rename the `.user.js` file or change `@namespace`, `@updateURL` or `@downloadURL`:
  installs and Greasy Fork are keyed on them.
- Public identity is `dividedby` only: no real name or personal email in code, headers, docs or
  commits. Commit as `dividedby <64715420+dividedby@users.noreply.github.com>`.
- Userscript engineering: the global rule `~/.claude/rules/userscripts.md` loads on `*.user.js`;
  the full checklist is [`docs/agents/userscript-guidelines.md`](docs/agents/userscript-guidelines.md).

## Definition of done

Every **user-facing change** moves these together, in the same commit or PR:

- the script's `@version` (keep its `x.y` numbering);
- `CHANGELOG.md`: an entry under `## [Unreleased]`, rolled into a dated version section at
  release (style: `docs/agents/changelog-guideline.md`);
- `README.md` when what a user sees or does changes;
- `greasyfork-description.md`: the Greasy Fork listing text, with a **New in x.y** section.
  Greasy Fork only picks it up if the listing is set to sync from this repo (owner's Greasy Fork
  admin); otherwise the owner pastes it in.
- Test on a real rtings.com review page: a plain click on a store link opens one new tab;
  Ctrl/Cmd-, Shift- and middle-click behave as the browser normally does.

Pushing to `main` is a release once Greasy Fork syncs from it: unfinished work goes on a branch.

## Where things live

| Topic                                   | File                                 |
| --------------------------------------- | ------------------------------------ |
| Issue tracker (GitHub issues, `gh`)     | `docs/agents/issue-tracker.md`       |
| Triage labels                           | `docs/agents/triage-labels.md`       |
| Domain docs (`CONTEXT.md`, `docs/adr/`) | `docs/agents/domain.md`              |
| Changelog style                         | `docs/agents/changelog-guideline.md` |

Ideas: Idea Inbox is issue [#1](https://github.com/dividedby/rtings-links/issues/1) (label `idea-inbox`); protocol in `docs/agents/idea-inbox.md`.
