# Contributing

The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into main.

## Requirements

* Node.js `^22.18.0 || >=24.11.0`, the same range as `engines` in `package.json` (CI runs the test matrix on 22 and 24)
* npm 10+
* A C++ toolchain is only needed on platforms without a `nodejieba` prebuilt binary

## Development

```shell
$ npm install          # also generates src/dictionary through the prepare script
$ npm run type-check   # tsc --noEmit over src, __test__, tasks and the configs
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm test             # Vitest
$ npm run package      # build dist/ and assemble .release/
$ npm run type-check:dist  # resolve dist/index.d.ts the way a NodeNext consumer does
```

`npm run dict:handle` regenerates `src/dictionary/*.json` from `tasks/dictionary`
and `tasks/BosonNLP`. The directory is generated, git-ignored and required at
runtime, which is why `prepare` runs it on `npm install` / `npm ci`.

## TypeScript specifics

* `tsconfig.json` type-checks everything (`noEmit`) and is the config the CI
  `type-check` step uses. `tsconfig.build.json` is the declaration-only config
  that writes `dist/**/*.d.ts`.
* `tasks/*.ts` are executed by Node's built-in type stripping, so they may only
  use syntax that can be erased: no `enum`, `namespace` or constructor parameter
  properties. `erasableSyntaxOnly` enforces this during `type-check`.
* `src/dictionaryLoader.ts` reads the dictionaries with `createRequire` instead
  of importing them: a static import would make TypeScript infer a type for
  every key of a ~3 MB JSON file.
* `src/types/nodejieba.d.ts` holds the ambient declaration for `nodejieba`,
  which ships no types.
* `release.config.js` stays JavaScript on purpose: semantic-release loads it
  through cosmiconfig, whose TypeScript loader resolves `typescript` from
  semantic-release's own install tree (inside the action) rather than from this
  project.

## Build outputs

`npm run package` writes `.release/`, which is what gets published:

| File | Purpose |
| --- | --- |
| `dist/index.js` | ESM entry (`main`, `module` and the `exports` entry) |
| `dist/**/*.d.ts` | Declarations for `types` and the `exports` types condition |
| `dist/dictionary/*.json` | Dictionary data read at runtime relative to `dist/index.js` |
| `package.json` | Source manifest without `scripts` and `devDependencies` |

`npm run build` runs `vite build` (ESM bundle, `nodejieba` and Node builtins
stay external), then `tsc -p tsconfig.build.json` for the declarations, then
`tasks/copyDictionaries.ts` so `dist/` is self-contained.

## Tests

`npm test` runs Vitest over `__test__`. `__test__/__fixtures__/baseline.json`
holds the result recorded from the previous CommonJS release for every text in
`__test__/__fixtures__/texts.json`; the suite compares against it so a scoring
change is never accidental. Regenerate both files together if a change to the
scoring is intentional.

## Repository settings required by the workflows

The bots cannot be fully expressed in code, so these switches live in the repository settings:

1. **Settings → Actions → General → Workflow permissions**: choose *Read and write permissions*. Dependabot opens its pull requests from branches inside this repository, which is why the `pull_request` event can hand `GITHUB_TOKEN` a write token there. Pull requests from forks stay read-only, and the workflow skips them through the `head.repo.full_name` guard.
2. **Settings → General**: enable *Allow auto-merge*.
3. **Branch protection on `main`**: block force pushes and deletions, but leave *Require status checks to pass before merging* **off**. `semantic-release` pushes `chore(release): … [skip ci]` straight to `main`, and GitHub rejects that push while a required check is configured.

The CI gate for Dependabot lives in `dependabotAutoMerge.yml` instead: it polls `gh pr checks` for `Test CI Summary`, squash merges only after it passes, and skips major updates. `Test CI` reports one check per matrix cell, so the `test-status` job aggregates them into that single check.

`Test CI` keeps the write token away from the steps that execute repository code: the `test` job is read-only, and the semantic-release dry-run lives in its own `release-dry-run` job gated to trusted refs.

## Labels

The triage bot and the issue forms reference labels that have to exist in the repository. `issues.addLabels` fails with `422` for unknown labels, so keep this list in sync when a rule changes:

| Label | Used by |
| --- | --- |
| `bug` | `bug_report.yml` form |
| `enhancement` | `feature_request.yml` form |
| `needs-info` | triage rule 3, plus the 7-day lifecycle in `stale.yml` |
| `install` | triage rule 1 (installation and native binding failures) |
| `usage` | triage rule 2 (usage questions) |
| `triaged` | manual exemption from the half-year staleness in `stale.yml` |
| `stale` | applied and removed by `actions/stale` |
| `ci` | `dependabot.yml` github-actions group |
| `dependencies` | `dependabot.yml` both ecosystems |

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) are required: `semantic-release` derives the version and the changelog from them. A breaking change must be marked with `!` and a `BREAKING CHANGE:` footer. Commit subjects and bodies are written in English.
