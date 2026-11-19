/* eslint no-console: 0 */
import path from 'node:path'
import process from 'node:process'

import fs from 'fs-extra'

const sourceDir = path.resolve(process.cwd(), 'tasks', 'dictionary')
const distDir = path.resolve(process.cwd(), 'src', 'dictionary')

// The directory only holds generated files: removing it keeps a dictionary
// deleted from tasks/dictionary from lingering in src/dictionary.
fs.removeSync(distDir)

const dictFileNames = fs.readdirSync(sourceDir)

dictFileNames.forEach((dictFileName) => {
  const jsonData = fs.readJsonSync(
    path.resolve(sourceDir, dictFileName),
  )

  fs.outputJsonSync(
    path.resolve(distDir, dictFileName),
    jsonData,
  )
})

console.log('dictionaryHanding success!')
