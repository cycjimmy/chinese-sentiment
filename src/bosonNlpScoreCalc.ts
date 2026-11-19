import jieba from 'nodejieba'

import { BOSON_NLP } from './dictionaryLoader'
import sentenceSegment from './utils/sentenceSegment'

export interface BosonNlpScore {
  score: number[]
  totalScore: number
  averageScore: number
}

interface SpecialWords {
  sentiWord: Record<number, number>
  notWord: Record<number, number>
  degreeWord: Record<number, number>
}

const sentiDict = BOSON_NLP.BosonNLP
const degreeDict = BOSON_NLP.degree
const notDict: Record<string, number> = {}
BOSON_NLP.not.forEach((word) => {
  notDict[word] = -1
})

function bosonNlpScoreCalc(text = ''): BosonNlpScore {
  const result: BosonNlpScore = {
    score: [],
    totalScore: 0,
    averageScore: 0,
  }

  // 定位情感词、否定词、程度词
  const locateSpecialWords = (words: string[]): SpecialWords => {
    const sentiWord: Record<number, number> = {}
    const notWord: Record<number, number> = {}
    const degreeWord: Record<number, number> = {}

    words.forEach((word, index) => {
      if (sentiDict[word]) {
        sentiWord[index] = sentiDict[word]
      }
      else if (notDict[word]) {
        notWord[index] = notDict[word]
      }
      else if (degreeDict[word]) {
        degreeWord[index] = degreeDict[word]
      }
    })

    return {
      sentiWord,
      notWord,
      degreeWord,
    }
  }

  // 计算句子情感分数
  const calcScore = (
    sentiWord: Record<number, number>,
    notWord: Record<number, number>,
    degreeWord: Record<number, number>,
    words: string[],
  ): number => {
    let W = 1
    let score = 0

    const sentiLocs = Object.keys(sentiWord)
      .map(Number)
    const notLocs = Object.keys(notWord)
      .map(Number)
    const degreeLocs = Object.keys(degreeWord)
      .map(Number)

    let sentiLoc = -1

    for (let i = 0; i < words.length; i += 1) {
      if (sentiLocs.includes(i)) {
        sentiLoc += 1
        score += W * sentiWord[i]

        if (sentiLoc < sentiLocs.length - 1) {
          for (let j = sentiLocs[sentiLoc]; j < sentiLocs[sentiLoc + 1]; j += 1) {
            if (notLocs.includes(j)) {
              W *= -1
            }
            else if (degreeLocs.includes(j)) {
              W *= degreeWord[j]
            }
          }
        }
      }
    }

    return score
  }

  const sentences = sentenceSegment(text)

  sentences.forEach((sentence) => {
    const words = jieba.cut(sentence, true)
    const {
      sentiWord,
      notWord,
      degreeWord,
    } = locateSpecialWords(words)
    const sentenceScore = calcScore(sentiWord, notWord, degreeWord, words)
    result.score.push(sentenceScore)
    result.totalScore += sentenceScore
  })

  result.averageScore = result.totalScore / sentences.length

  return result
}

export default bosonNlpScoreCalc
