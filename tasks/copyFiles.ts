/* eslint no-console: 0 */
import path from 'node:path'

import fs from 'fs-extra'

fs.copySync(
  path.resolve('dist'),
  path.resolve('.release', 'dist'),
)
fs.copySync(
  path.resolve('README.md'),
  path.resolve('.release', 'README.md'),
)
fs.copySync(
  path.resolve('LICENSE'),
  path.resolve('.release', 'LICENSE'),
)

console.log('copyFiles success!')
