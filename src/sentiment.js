const jieba = require('nodejieba');

const dictionDUTIR = require('./dictionary/DUTIR.json').DUTIR;
const dictionHOWNET = require('./dictionary/HOWNET.json').HOWNET;
const dictionChineseSTOPWORDS = require('./dictionary/STOPWORDS.json').STOPWORDS.chinese;
const sentenceSegment = require('./utils/sentenceSegment');

/**
 * sentiment
 * @param text
 * @param dictionaries
 * @returns {{}}
 */
module.exports = (text = '', dictionaries = [
  dictionDUTIR,
  dictionHOWNET,
]) => {
  const sentences = sentenceSegment(text);
  const result = {};

  dictionaries.forEach((diction) => {
    const sentiCategories = Object.keys(diction);

    sentiCategories.forEach((sentiCategory) => {
      result[sentiCategory] = 0; // 初始值初始化

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

    dictionaries.forEach((diction) => {
      const sentiCategories = Object.keys(diction);

      sentiCategories.forEach((sentiCategory) => {
        if (diction[sentiCategory].includes(word)) {
          result[sentiCategory] += 1;
        }
      });
    });
  });

  result.stopwords = stopwords;
  result.words = wordsLength;
  result.sentences = sentences.length;

  return result;
};
