/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: 0 */
const { resolve } = require('path');
const fs = require('fs-extra');

const { readJsonSync, outputJsonSync } = fs;

const jsonData = readJsonSync(
  resolve('package.json'),
);

if (jsonData.scripts) {
  delete jsonData.scripts;
}

if (jsonData.devDependencies) {
  delete jsonData.devDependencies;
}

if (jsonData.config) {
  delete jsonData.config;
}

outputJsonSync(
  resolve('.release', 'package.json'),
  jsonData,
  {
    spaces: 2,
  },
);

console.log('handlePackageJson success!');
