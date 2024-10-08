# chinese-sentiment

![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

Chinese sentiment analysis for Node. **Currently under testing.**

## How to use
### Install
[![NPM latest version][npm-latest-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
$ npm install @cycjimmy/chinese-sentiment --save
```

### Usage
```javascript
const cnSenti = require('@cycjimmy/chinese-sentiment');

const sentiment = cnSenti('需要分析的文本');
console.log(sentiment); 
// output: { ... }
// Currently under testing.
// The returned results are mainly based on the actual version.
```

<!-- Links: -->
[npm-latest-image]: https://img.shields.io/npm/v/@cycjimmy/chinese-sentiment/latest
[npm-url]: https://npmjs.org/package/@cycjimmy/chinese-sentiment

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/chinese-sentiment
[download-url]: https://npmjs.org/package/@cycjimmy/chinese-sentiment

[workflows-badge-image]: https://github.com/cycjimmy/chinese-sentiment/workflows/Test%20CI/badge.svg

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/chinese-sentiment
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/chinese-sentiment
[libraries-status-url]: https://libraries.io/github/cycjimmy/chinese-sentiment
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fchinese-sentiment

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/chinese-sentiment
[release-url]: https://github.com/cycjimmy/chinese-sentiment/releases

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/chinese-sentiment
