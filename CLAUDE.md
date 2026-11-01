# CLAUDE.md

Conventions for this repo: personal Tampermonkey userscripts for browsing quality of life.
Public, MIT licensed, copyright James Miller. GitHub: `darkerlogic/darkerlogic-scripts`, branch `main`.

## Layout

```
scripts/<site-or-category>/<name>.user.js   one folder per site (e.g. scripts/youtube/)
shared/<helper>.js                          reusable helpers, loaded via @require
templates/template.user.js                  starting point for every new script
README.md                                   install guide + script table
CHANGELOG.md                                per-script version history
```

## Naming

- kebab-case, ending in `.user.js` (e.g. `hide-shorts.user.js`). Tampermonkey offers to install any URL ending in `.user.js`.
- Site folders are kebab-case, named after the site (`youtube`, `github`, `reddit`).

## Metadata header

Every script starts from `templates/template.user.js` and has all of:

| Key | Rule |
|---|---|
| `@name` | Human-readable, unique within the repo. Don't rename after release (Tampermonkey identifies scripts by `@name` + `@namespace`). |
| `@namespace` | Always `https://github.com/darkerlogic/darkerlogic-scripts` |
| `@version` | Semantic versioning, starts at `1.0.0` |
| `@description` | One sentence: what it does |
| `@author` | `James Miller` |
| `@match` | The site James names, as narrow as the script allows (specific host and path if possible). Ask if the site is unclear. |
| `@grant` | Only what is needed. `none` if no GM_* APIs are used. |
| `@license` | `MIT` |
| `@updateURL` / `@downloadURL` | `https://raw.githubusercontent.com/darkerlogic/darkerlogic-scripts/main/scripts/<site>/<name>.user.js` |

### All-sites rule

If a script would need to run on every site (`*://*/*`, `<all_urls>`, or similarly broad patterns),
**stop and flag it as a browser extension candidate** instead of writing it as a userscript.

## Versioning

Bump `@version` on every change (semantic versioning), then add a CHANGELOG entry:

- **MAJOR** (`2.0.0`): behavior changes a user would notice and might not want, or removed features
- **MINOR** (`1.1.0`): new feature, backward compatible
- **PATCH** (`1.0.1`): bug fix, or a selector updated because the site changed

Tampermonkey only installs an update when `@version` increases. Pushing a change without bumping it means nobody gets it.

## Code rules

- Vanilla JavaScript. No external libraries unless James approves.
- Wrap code in an IIFE with `'use strict'`.
- Scripts must never collect or send personal data. No analytics, no network calls to third parties.
- Shared helpers from `shared/` are loaded with `@require`, pinned to a tag or commit SHA
  (`.../darkerlogic-scripts/<sha>/shared/<helper>.js`), never `main`. Tampermonkey caches `@require`d files.

## When adding or changing a script

1. Bump `@version`
2. Add a CHANGELOG.md entry
3. Update the README.md script table (add a row for new scripts, update description if behavior changed)
