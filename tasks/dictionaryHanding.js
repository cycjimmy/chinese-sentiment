/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: 0 */
const { resolve } = require('path');
const fs = require('fs-extra');

const { readdirSync, readJsonSync, outputJsonSync } = fs;

const sourceDir = resolve(process.cwd(), 'tasks', 'dictionary');
const distDir = resolve(process.cwd(), 'src', 'dictionary');

const dictFileNames = readdirSync(sourceDir);

dictFileNames.forEach((dictFileName) => {
  const jsonData = readJsonSync(
    resolve(sourceDir, dictFileName),
  );

  outputJsonSync(
    resolve(distDir, dictFileName),
    jsonData,
  );
});

console.log('dictionaryHanding success!');
