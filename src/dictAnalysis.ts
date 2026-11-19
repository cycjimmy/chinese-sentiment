import type { SentiDict } from './dictionaryLoader'

import jieba from 'nodejieba'
import { CHINESE_STOPWORDS, DUTIR, HOWNET } from './dictionaryLoader'
import sentenceSegment from './utils/sentenceSegment'

export interface DictAnalysisResult {
  DUTIR: Record<string, number>
  HOWNET: Record<string, number>
  stopwords: number
  words: number
  sentences: number
}

const DICTIONARIES: Record<keyof Pick<DictAnalysisResult, 'DUTIR' | 'HOWNET'>, SentiDict> = {
  DUTIR,
  HOWNET,
}

interface CategoryIndex {
  category: string
  words: Set<string>
}

interface DictionaryIndex {
  name: keyof typeof DICTIONARIES
  categories: CategoryIndex[]
}

const stopwordSet = new Set(CHINESE_STOPWORDS)

// Registering the words with jieba and indexing the categories is done once at
// module load instead of on every call: the dictionaries hold ~17k words and
// the registration used to be repeated for each analysed text.
const dictionaryIndexes: DictionaryIndex[] = (Object.keys(DICTIONARIES) as Array<keyof typeof DICTIONARIES>)
  .map(name => ({
    name,
    categories: Object.entries(DICTIONARIES[name]).map(([category, words]) => {
      words.forEach((word) => {
        try {
          jieba.insertWord(word)
        }
        catch {
          // The word is already registered; jieba rejects duplicates it cannot
          // merge, which must not abort the load.
        }
      })

      return {
        category,
        words: new Set(words),
      }
    }),
  }))

/**
 * Count how many words of each dictionary category occur in the text.
 */
function dictAnalysis(text = ''): DictAnalysisResult {
  const result: DictAnalysisResult = {
    DUTIR: {},
    HOWNET: {},
    stopwords: 0,
    words: 0,
    sentences: 0,
  }

  dictionaryIndexes.forEach(({ name, categories }) => {
    categories.forEach(({ category }) => {
      result[name][category] = 0 // 初始值初始化
    })
  })

  const words = jieba.cut(text, true)

  words.forEach((word) => {
    if (stopwordSet.has(word)) {
      result.stopwords += 1
    }

    dictionaryIndexes.forEach(({ name, categories }) => {
      categories.forEach(({ category, words: categoryWords }) => {
        if (categoryWords.has(word)) {
          result[name][category] += 1
        }
      })
    })
  })

  result.words = words.length
  result.sentences = sentenceSegment(text).length

  return result
}

export default dictAnalysis
