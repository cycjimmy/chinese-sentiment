/* eslint no-console: 0 */
import path from 'node:path'
import process from 'node:process'

import fs from 'fs-extra'

// Build output only: a deterministic removal keeps the repository free of a
// `.Trash` fallback directory, which `trash` creates on volumes without a
// usable system trash (external disks, some CI runners).
const target = process.argv[2]

if (!target) {
  throw new Error('removeDir: a path argument is required')
}

fs.removeSync(path.resolve(target))

console.log(`removeDir success! (${target})`)
