const sentiment = require('./sentiment');
const sentimentScoreCalculate = require('./sentimentScoreCalculate');
const dictionDUTIR = require('./dictionary/DUTIR.json').DUTIR;
const dictionHOWNET = require('./dictionary/HOWNET.json').HOWNET;

/**
 * sentiment
 * @param text
 * @returns {{}}
 */
module.exports = (text) => ({
  ...sentiment(text, [
    dictionDUTIR,
    dictionHOWNET,
  ]),
  ...sentimentScoreCalculate(text),
});
