// `nodejieba` ships no type declarations. The package exposes a single
// CommonJS object, so it is declared here as a default export: under ESM the
// default import is `module.exports` itself.
declare module 'nodejieba' {
  export interface NodeJieba {
    DEFAULT_DICT: string
    DEFAULT_HMM_DICT: string
    DEFAULT_USER_DICT: string
    DEFAULT_IDF_DICT: string
    DEFAULT_STOP_WORD_DICT: string
    load: (dictJson?: Record<string, string>) => boolean
    cut: (sentence: string, hmm?: boolean) => string[]
    cutAll: (sentence: string) => string[]
    cutHMM: (sentence: string) => string[]
    cutForSearch: (sentence: string, hmm?: boolean) => string[]
    cutSmall: (sentence: string, wordSize: number) => string[]
    tag: (sentence: string) => Array<{ word: string, tag: string }>
    extract: (sentence: string, topK?: number, allowedPos?: string[]) => Array<[string, number]>
    textRankExtract: (sentence: string, topK?: number, allowedPos?: string[]) => Array<[string, number]>
    insertWord: (word: string, freq?: number) => void
  }

  const jieba: NodeJieba

  export default jieba
}
