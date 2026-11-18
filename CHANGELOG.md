# Changelog

All notable changes to the **Rtings Open Shopping Links in New Tab Only** userscript
(`rtingsLinks.user.js`, distributed via [Greasy Fork](https://greasyfork.org/scripts/508341))
are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/2.0.0/).

## [Unreleased]

### Changed

- Internal: `docs/agents/domain.md` and `docs/agents/idea-inbox.md` name the domain glossary `GLOSSARY.md` (was `CONTEXT.md`, and `CONTEXT-MAP.md` → `GLOSSARY-MAP.md`), the name the upstream `grilling`, `domain-modeling`, `tdd`, `to-spec` and `to-tickets` skills now read. No behavior change.
- Internal: code brought to the shared style, and tests added. No behavior change.

## [1.4] - 2026-10-13

### Fixed

- Ctrl/Cmd-click, Shift-click, Alt-click and middle-click on shopping links now do what
  your browser normally does (background tab, new window, download) instead of always
  opening one new tab.

### Changed

- The script no longer runs inside embedded frames on rtings.com and asks for no special
  userscript permissions.
