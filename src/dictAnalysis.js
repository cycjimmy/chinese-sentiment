const jieba = require('nodejieba');
const { default: entries } = require('@cycjimmy/awesome-js-funcs/cjs/object/entries.cjs');

const dictionDUTIR = require('./dictionary/DUTIR.json').DUTIR;
const dictionHOWNET = require('./dictionary/HOWNET.json').HOWNET;
const dictionChineseSTOPWORDS = require('./dictionary/STOPWORDS.json').STOPWORDS.chinese;
const sentenceSegment = require('./utils/sentenceSegment');

/**
 * dictAnalysis
 * @param text
 * @param dictionaries
 * @returns {{}}
 */
module.exports = (text = '', dictionaries = {
  DUTIR: dictionDUTIR,
  HOWNET: dictionHOWNET,
}) => {
  const sentences = sentenceSegment(text);
  const result = {};

  entries(dictionaries).forEach(([dictionaryName, diction]) => {
    result[dictionaryName] = {};
    const sentiCategories = Object.keys(diction);

    sentiCategories.forEach((sentiCategory) => {
      result[dictionaryName][sentiCategory] = 0; // 初始值初始化

      const dictWords = diction[sentiCategory];
      dictWords.forEach((word) => {
        try {
          jieba.insertWord(word);
        } catch (e) { /* empty */
        }
      });
    });
  });

  const words = jieba.cut(text, true);
  const wordsLength = words.length;
  let stopwords = 0;

  words.forEach((word) => {
    if (dictionChineseSTOPWORDS.includes(word)) {
      stopwords += 1;
    }

    entries(dictionaries).forEach(([dictionaryName, diction]) => {
      const sentiCategories = Object.keys(diction);

      sentiCategories.forEach((sentiCategory) => {
        if (diction[sentiCategory].includes(word)) {
          result[dictionaryName][sentiCategory] += 1;
        }
      });
    });
  });

  result.stopwords = stopwords;
  result.words = wordsLength;
  result.sentences = sentences.length;

  return result;
};
