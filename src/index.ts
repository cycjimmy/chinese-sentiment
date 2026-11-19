// These specifiers are copied verbatim into `dist/index.d.ts`, so they need an
// ESM file extension: a consumer resolving the package with `NodeNext`/`Node16`
// cannot resolve an extensionless relative import.
import type { BosonNlpScore } from './bosonNlpScoreCalc.js'
import type { DictAnalysisResult } from './dictAnalysis.js'
import type { HownetScore } from './hownetScoreCalc.js'

import bosonNlpScoreCalc from './bosonNlpScoreCalc'
import dictAnalysis from './dictAnalysis'
import hownetScoreCalc from './hownetScoreCalc'

export type { BosonNlpScore, DictAnalysisResult, HownetScore }

export interface SentimentResult extends DictAnalysisResult {
  HOWNET: DictAnalysisResult['HOWNET'] & HownetScore
  BosonNLP: BosonNlpScore
}

/**
 * sentiment
 *
 * Combines the three scorers into a single result object. The DUTIR and HOWNET
 * categories are word counts, while the HOWNET `posScore`/`negScore` and the
 * whole `BosonNLP` branch are weighted scores.
 */
function sentiment(text: string): SentimentResult {
  const analysis = dictAnalysis(text)

  // The property order follows the previous CommonJS release so a serialised
  // result stays byte-identical.
  return {
    DUTIR: analysis.DUTIR,
    HOWNET: {
      ...analysis.HOWNET,
      ...hownetScoreCalc(text),
    },
    stopwords: analysis.stopwords,
    words: analysis.words,
    sentences: analysis.sentences,
    BosonNLP: bosonNlpScoreCalc(text),
  }
}

export { sentiment }
export default sentiment
