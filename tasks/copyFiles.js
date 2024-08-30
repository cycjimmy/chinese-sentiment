/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: 0 */
const { resolve } = require('path');
const fs = require('fs-extra');

const { copySync } = fs;

copySync(
  resolve('src'),
  resolve('.release', 'src'),
);
copySync(
  resolve('README.md'),
  resolve('.release', 'README.md'),
);
copySync(
  resolve('LICENSE'),
  resolve('.release', 'LICENSE'),
);

console.log('copyFiles success!');
