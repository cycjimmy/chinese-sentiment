const dictAnalysis = require('./dictAnalysis');
const hownetScoreCalc = require('./hownetScoreCalc');
const bosonNlpScoreCalc = require('./bosonNlpScoreCalc');

/**
 * sentiment
 * @param text
 * @returns {{}}
 */
module.exports = (text) => {
  const result = {
    ...dictAnalysis(text),
  };
  result.HOWNET = {
    ...result.HOWNET,
    ...hownetScoreCalc(text),
  };
  result.BosonNLP = bosonNlpScoreCalc(text);
  return result;
};
