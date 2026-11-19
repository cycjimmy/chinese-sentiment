# chinese-sentiment

[![Test CI][workflows-badge-image]][workflows-badge-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

Chinese sentiment analysis for Node. **Currently under testing.**

## Requirements

* Node.js `^22.18.0 || >=24.11.0`, the same range as `engines` in `package.json`
* The package is **ESM only**. CommonJS consumers can still load it with
  `require()`, which Node.js has supported for ES modules since 22.12.

`nodejieba` is a native addon. Prebuilt binaries are published for Node.js 22
and 24 on `darwin-arm64`, `linux-x64`/`linux-arm64` (glibc) and `win32-x64`;
other platforms compile it from source and need a C++ toolchain.

## How to use

### Install

[![NPM latest version][npm-latest-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
$ npm install @cycjimmy/chinese-sentiment --save
```

### Usage

```javascript
import sentiment from '@cycjimmy/chinese-sentiment'

const result = sentiment('我今天得奖了，很高兴，我要将快乐分享大家。')
console.log(result)
```

CommonJS works through `require()` as well, and the named export avoids reaching
for `.default`:

```javascript
const { sentiment } = require('@cycjimmy/chinese-sentiment')

console.log(sentiment('需要分析的文本'))
```

### Result

| Field | Description |
| --- | --- |
| `DUTIR` | Word counts per DUTIR emotion category (`乐`, `好`, `怒`, `哀`, `惧`, `恶`, `惊`) |
| `HOWNET` | Word counts for the HOWNET categories (`pos`, `neg`, `extreme`, `very`, `more`, `ish`, `deny`) plus the weighted `posScore` and `negScore` |
| `BosonNLP.score` | Per-sentence BosonNLP score |
| `BosonNLP.totalScore` | Sum of the per-sentence scores |
| `BosonNLP.averageScore` | `totalScore` divided by the number of sentences |
| `stopwords` | Number of words found in the Chinese stop word list |
| `words` | Number of segmented words |
| `sentences` | Number of sentences detected in the text |

```text
{
  DUTIR: { 乐: 2, 好: 0, 怒: 0, 哀: 0, 惧: 0, 恶: 0, 惊: 0 },
  HOWNET: {
    deny: 0, extreme: 0, ish: 0, more: 0, neg: 0, pos: 3, very: 1,
    posScore: 35, negScore: 0
  },
  stopwords: 8,
  words: 14,
  sentences: 1,
  BosonNLP: { score: [14.2012328894203], totalScore: 14.2012328894203, averageScore: 14.2012328894203 }
}
```

The returned results are mainly based on the actual version.

## Development

```shell
$ npm install          # fetches nodejieba and generates src/dictionary
$ npm run type-check   # tsc --noEmit
$ npm run lint         # ESLint (flat config, @antfu/eslint-config)
$ npm test             # Vitest
$ npm run package      # build dist/ and assemble .release/
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the toolchain details.

<!-- Links: -->
[npm-latest-image]: https://img.shields.io/npm/v/@cycjimmy/chinese-sentiment/latest
[npm-url]: https://npmjs.org/package/@cycjimmy/chinese-sentiment

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/chinese-sentiment
[download-url]: https://npmjs.org/package/@cycjimmy/chinese-sentiment

[workflows-badge-image]: https://github.com/cycjimmy/chinese-sentiment/workflows/Test%20CI/badge.svg
[workflows-badge-url]: https://github.com/cycjimmy/chinese-sentiment/actions/workflows/nodeTestCI.yml

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/chinese-sentiment
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/chinese-sentiment
[libraries-status-url]: https://libraries.io/github/cycjimmy/chinese-sentiment
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fchinese-sentiment

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/chinese-sentiment
[release-url]: https://github.com/cycjimmy/chinese-sentiment/releases

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/chinese-sentiment
