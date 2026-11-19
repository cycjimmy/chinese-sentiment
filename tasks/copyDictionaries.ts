/* eslint no-console: 0 */
import path from 'node:path'

import fs from 'fs-extra'

// The dictionaries are read at runtime relative to `dist/index.js`, so they
// have to ship inside dist for a locally built package to be self-contained.
fs.copySync(
  path.resolve('src', 'dictionary'),
  path.resolve('dist', 'dictionary'),
)

console.log('copyDictionaries success!')
