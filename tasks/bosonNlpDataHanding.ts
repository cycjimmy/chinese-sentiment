import type { BosonNlpData } from '../src/dictionaryLoader'

/* eslint no-console: 0 */
import path from 'node:path'
import process from 'node:process'

import fs from 'fs-extra'

const sourceDir = path.resolve(process.cwd(), 'tasks', 'BosonNLP')
const distDir = path.resolve(process.cwd(), 'src', 'dictionary')

const jsonData: BosonNlpData = {
  BosonNLP: {},
  degree: {},
  not: [],
}

// BosonNLP_sentiment_score.txt
const bosonNlpData = fs.readFileSync(path.resolve(sourceDir, 'BosonNLP_sentiment_score.txt'), 'utf-8')
const bosonNlpLines = bosonNlpData.split('\n')

bosonNlpLines.forEach((line) => {
  if (!line.includes(' '))
    return
  const [word, score] = line.split(' ')
  jsonData.BosonNLP[word.trim()] = Number.parseFloat(score.trim())
})

// degreeDict.txt
const degreeDictData = fs.readFileSync(path.resolve(sourceDir, 'degreeDict.txt'), 'utf-8')
const degreeDictLines = degreeDictData.split('\n')

degreeDictLines.forEach((line) => {
  if (!line.includes(','))
    return
  const [word, score] = line.split(',')
  jsonData.degree[word.trim()] = Number.parseFloat(score.trim())
})

// notDict.txt
const notDictData = fs.readFileSync(path.resolve(sourceDir, 'notDict.txt'), 'utf-8')
const notDictLines = notDictData.split('\n')

notDictLines.forEach((line) => {
  const word = line.trim()
  if (word) {
    jsonData.not.push(word)
  }
})

fs.outputJsonSync(
  path.resolve(distDir, 'BosonNLP.json'),
  jsonData,
)

console.log('bosonNlpDataHanding success!')
