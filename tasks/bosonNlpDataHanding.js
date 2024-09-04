/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: 0 */
const { resolve } = require('path');
const fs = require('fs-extra');

const {
  readFileSync,
  outputJsonSync,
} = fs;

const sourceDir = resolve(process.cwd(), 'tasks', 'BosonNLP');
const distDir = resolve(process.cwd(), 'src', 'dictionary');

const jsonData = {
  BosonNLP: {},
  degree: {},
  not: [],
};

// BosonNLP_sentiment_score.txt
const bosonNlpData = readFileSync(resolve(sourceDir, 'BosonNLP_sentiment_score.txt'), 'utf-8');
const bosonNlpLines = bosonNlpData.split('\n');

bosonNlpLines.forEach((line) => {
  if (!line.includes(' ')) return;
  const [word, score] = line.split(' ');
  jsonData.BosonNLP[word.trim()] = parseFloat(score.trim());
});

// degreeDict.txt
const degreeDictData = readFileSync(resolve(sourceDir, 'degreeDict.txt'), 'utf-8');
const degreeDictLines = degreeDictData.split('\n');

degreeDictLines.forEach((line) => {
  if (!line.includes(',')) return;
  const [word, score] = line.split(',');
  jsonData.degree[word.trim()] = parseFloat(score.trim());
});

// notDict.txt
const notDictData = readFileSync(resolve(sourceDir, 'notDict.txt'), 'utf-8');
const notDictLines = notDictData.split('\n');

notDictLines.forEach((line) => {
  const word = line.trim();
  if (word) {
    jsonData.not.push(word);
  }
});

outputJsonSync(
  resolve(distDir, 'BosonNLP.json'),
  jsonData,
);

console.log('bosonNlpDataHanding success!');
