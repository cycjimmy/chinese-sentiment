import type { SentimentResult } from '../src/index'

import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'
import sentiment from '../src/index'

// Read through the filesystem rather than importing the JSON: the fixtures are
// data, not part of the type graph, and a static import would need
// `resolveJsonModule`.
function readFixture<T>(name: string): T {
  return JSON.parse(readFileSync(new URL(`./__fixtures__/${name}`, import.meta.url), 'utf8')) as T
}

const texts = readFixture<string[]>('texts.json')
const baseline = readFixture<SentimentResult[]>('baseline.json')

const DUTIR_CATEGORIES = ['乐', '好', '怒', '哀', '惧', '恶', '惊']
const HOWNET_CATEGORIES = [
  'deny',
  'extreme',
  'ish',
  'more',
  'neg',
  'pos',
  'very',
]

describe('sentiment', () => {
  // The baseline was recorded from the previous CommonJS release, so an
  // identical result proves the migration did not change any score.
  texts.forEach((text, index) => {
    it(`keeps the recorded result for fixture ${index + 1}`, () => {
      expect(sentiment(text)).toEqual(baseline[index])
    })
  })

  it('reports every dictionary category', () => {
    const result = sentiment(texts[0])

    expect(Object.keys(result.DUTIR)).toEqual(DUTIR_CATEGORIES)
    expect(Object.keys(result.HOWNET)).toEqual([...HOWNET_CATEGORIES, 'posScore', 'negScore'])
  })

  it('reports one BosonNLP score per sentence', () => {
    texts.forEach((text) => {
      const result = sentiment(text)

      expect(result.BosonNLP.score).toHaveLength(result.sentences)
    })
  })

  it('keeps the sign of the overall score', () => {
    expect(sentiment('我今天得奖了，很高兴，我要将快乐分享大家。').BosonNLP.totalScore).toBeGreaterThan(0)
    expect(sentiment('悲伤犹如深渊，将我的灵魂吞噬，让我感到无尽的绝望。').BosonNLP.totalScore).toBeLessThan(0)
  })

  it('handles empty input without throwing', () => {
    const result = sentiment('')

    expect(result.words).toBe(0)
    expect(result.sentences).toBe(0)
    expect(result.stopwords).toBe(0)
    expect(result.BosonNLP.totalScore).toBe(0)
    expect(result.BosonNLP.score).toEqual([])
  })
})
