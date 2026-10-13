# Rtings Open Shopping Links in New Tab Only

A userscript for [rtings.com](https://www.rtings.com): store links (Amazon, Best Buy, B&H
Photo and the rest) open in a new tab, so the review you're reading stays where it is.
Rtings opens them in the same tab, which loses your place.

**Install:** [Greasy Fork](https://greasyfork.org/en/scripts/508341) · [Changelog](CHANGELOG.md)

## How it works

- A plain click on any link that leaves rtings.com opens it in a new tab. Links within
  rtings.com work as usual.
- Ctrl/Cmd-click, Shift-click and middle-click are left to your browser, so "open in a
  background tab" and "open in a new window" still work.
- Nothing is sent anywhere: the script only changes how the click opens the link.

## Installing

1. Get a userscript manager: [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge,
   Firefox, Safari), [Violentmonkey](https://violentmonkey.github.io/) (Firefox), or the
   [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) app (Safari on iPhone,
   iPad and Mac). In Chrome, also turn on **Allow user scripts** on Tampermonkey's details page.
2. Open the [Greasy Fork listing](https://greasyfork.org/en/scripts/508341) and click
   **Install this script**. Updates come from there.

## Development

The script is a single file, [`rtingsLinks.user.js`](rtingsLinks.user.js), with no build
step and no dependencies. Tests live in [`test/`](test/): run `node --test` from the
repo root (Node 22). Bump `@version` with every change users would notice, and add it to the
[changelog](CHANGELOG.md) and [`greasyfork-description.md`](greasyfork-description.md).
Bugs and ideas go in the [issues](https://github.com/dividedby/rtings-links/issues).

## License

GPL-3.0-or-later. See [LICENSE](LICENSE).
