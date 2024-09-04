const jieba = require('nodejieba');

const judgeOdd = require('./utils/judgeOdd');
const dictionHOWNET = require('./dictionary/HOWNET.json').HOWNET;

const sentiCategories = Object.keys(dictionHOWNET);
const dictWords = {
  pos: [], // 积极词
  neg: [], // 消极词
  extreme: [], // 程度副词：极度
  very: [], // 程度副词：非常
  more: [], // 程度副词：较
  ish: [], // 程度副词：稍
  deny: [], // 否定词
};

sentiCategories.forEach((sentiCategory) => {
  dictWords[sentiCategory] = dictionHOWNET[sentiCategory];
  dictWords[sentiCategory].forEach((word) => {
    try {
      jieba.insertWord(word);
    } catch (e) { /* empty */
    }
  });
});

/**
 * hownetScoreCalculate
 * @param text
 * @returns {{negScore: *, posScore: *}}
 */
module.exports = (text) => {
  const sentences = text.split(/[.。！!？?\n;；]+/).filter(Boolean);
  const count2 = [];

  sentences.forEach((sentence) => {
    const segTmp = jieba.cut(sentence, true);
    let posCount = 0;
    let posCount2 = 0;
    let posCount3 = 0;
    let negCount = 0;
    let negCount2 = 0;
    let negCount3 = 0;
    let i = 0;
    let a = 0;

    segTmp.forEach((word) => {
      if (dictWords.pos.includes(word)) {
        posCount += 1;
        let c = 0;
        segTmp.slice(a, i).forEach((w) => {
          if (dictWords.extreme.includes(w)) posCount *= 4;
          else if (dictWords.very.includes(w)) posCount *= 3;
          else if (dictWords.more.includes(w)) posCount *= 2;
          else if (dictWords.ish.includes(w)) posCount *= 0.5;
          else if (dictWords.deny.includes(w)) c += 1;
        });
        if (judgeOdd(c)) {
          posCount *= -1;
          posCount2 += posCount;
          posCount3 = posCount2 + posCount3;
          posCount2 = 0;
        } else {
          posCount3 = posCount + posCount2 + posCount3;
          posCount = 0;
        }
        a = i + 1;
      } else if (dictWords.neg.includes(word)) {
        negCount += 1;
        let d = 0;
        segTmp.slice(a, i).forEach((w) => {
          if (dictWords.extreme.includes(w)) posCount *= 4;
          else if (dictWords.very.includes(w)) negCount *= 3;
          else if (dictWords.more.includes(w)) negCount *= 2;
          else if (dictWords.ish.includes(w)) negCount *= 0.5;
          else if (dictWords.deny.includes(w)) d += 1;
        });
        if (judgeOdd(d)) {
          negCount *= -1;
          negCount2 += negCount;
          negCount3 = negCount2 + negCount3;
          negCount2 = 0;
        } else {
          negCount3 = negCount + negCount2 + negCount3;
          negCount = 0;
        }
        a = i + 1;
      } else if (word === '！' || word === '!') {
        const segTmpReverse = segTmp.reverse();
        for (let i2 = 0; i2 < segTmpReverse.length; i2 += 1) {
          if (
            dictWords.pos.includes(segTmpReverse[i2])
            || dictWords.neg.includes(segTmpReverse[i2])
          ) {
            posCount3 += 2;
            negCount3 += 2;
            break;
          }
        }
      }
      i += 1;

      let finalPosCount;
      let finalNegCount = 0;
      if (posCount3 < 0 && negCount3 > 0) {
        finalNegCount += negCount3 - posCount3;
        finalPosCount = 0;
      } else if (negCount3 < 0 && posCount3 > 0) {
        finalPosCount = posCount3 - negCount3;
        finalNegCount = 0;
      } else if (posCount3 < 0 && negCount3 < 0) {
        finalNegCount = -posCount3;
        finalPosCount = -negCount3;
      } else {
        finalPosCount = posCount3;
        finalNegCount = negCount3;
      }

      count2.push([finalPosCount, finalNegCount]);
    });
  });

  const posScore = count2.reduce((sum, count) => sum + count[0], 0);
  const negScore = count2.reduce((sum, count) => sum + count[1], 0);

  return {
    posScore,
    negScore,
  };
};
