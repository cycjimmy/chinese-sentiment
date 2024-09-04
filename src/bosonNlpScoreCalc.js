const jieba = require('nodejieba');

const BosonNlPData = require('./dictionary/BosonNLP.json');
const sentenceSegment = require('./utils/sentenceSegment');

const sentiDict = BosonNlPData.BosonNLP;
const degreeDict = BosonNlPData.degree;
const notDict = {};
BosonNlPData.not.forEach((word) => {
  notDict[word] = -1;
});

module.exports = (text = '') => {
  const result = {
    score: [],
    totalScore: 0,
    averageScore: 0,
  };

  // 定位情感词、否定词、程度词
  const locateSpecialWords = (words) => {
    const sentiWord = {};
    const notWord = {};
    const degreeWord = {};

    words.forEach((word, index) => {
      if (sentiDict[word]) {
        sentiWord[index] = sentiDict[word];
      } else if (notDict[word]) {
        notWord[index] = notDict[word];
      } else if (degreeDict[word]) {
        degreeWord[index] = degreeDict[word];
      }
    });

    return {
      sentiWord,
      notWord,
      degreeWord,
    };
  };

  // 计算句子情感分数
  const calcScore = (sentiWord, notWord, degreeWord, words) => {
    let W = 1;
    let score = 0;

    const sentiLocs = Object.keys(sentiWord)
      .map(Number);
    const notLocs = Object.keys(notWord)
      .map(Number);
    const degreeLocs = Object.keys(degreeWord)
      .map(Number);

    let sentiLoc = -1;

    for (let i = 0; i < words.length; i += 1) {
      if (sentiLocs.includes(i)) {
        sentiLoc += 1;
        score += W * parseFloat(sentiWord[i]);

        if (sentiLoc < sentiLocs.length - 1) {
          for (let j = sentiLocs[sentiLoc]; j < sentiLocs[sentiLoc + 1]; j += 1) {
            if (notLocs.includes(j)) {
              W *= -1;
            } else if (degreeLocs.includes(j)) {
              W *= degreeWord[j];
            }
          }
        }
      }
    }

    return score;
  };

  const sentences = sentenceSegment(text);

  sentences.forEach((sentence) => {
    const words = jieba.cut(sentence, true);
    const {
      sentiWord,
      notWord,
      degreeWord,
    } = locateSpecialWords(words);
    const sentenceScore = calcScore(sentiWord, notWord, degreeWord, words);
    result.score.push(sentenceScore);
    result.totalScore += sentenceScore;
  });

  result.averageScore = result.totalScore / sentences.length;

  return result;
};
