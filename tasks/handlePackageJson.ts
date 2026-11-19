/* eslint no-console: 0 */
import path from 'node:path'

import fs from 'fs-extra'

interface ReleasePackageJson {
  scripts?: unknown
  devDependencies?: unknown
  config?: unknown
  publishConfig?: { access?: string }
  [key: string]: unknown
}

const jsonData = fs.readJsonSync(
  path.resolve('package.json'),
) as ReleasePackageJson

if (jsonData.scripts) {
  delete jsonData.scripts
}

if (jsonData.devDependencies) {
  delete jsonData.devDependencies
}

// A scoped package without `publishConfig.access` is published as `restricted`,
// which fails on a free npm account. Keep the access level only: the registry
// and tag are decided by the release tooling, not by the source package.json.
jsonData.publishConfig = {
  access: jsonData.publishConfig?.access ?? 'public',
}

if (jsonData.config) {
  delete jsonData.config
}

fs.outputJsonSync(
  path.resolve('.release', 'package.json'),
  jsonData,
  {
    spaces: 2,
  },
)

console.log('handlePackageJson success!')
