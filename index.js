const clc = require('cli-color');

const loglevel = process.env.LOG_LEVEL || 'debug';

let loglevelList = ['debug', 'log', 'info', 'warn', 'error'];
let loglevelIndex = loglevelList.indexOf(loglevel);

if (loglevelIndex === -1) {
  loglevelIndex = 1;
}

const logFn = loglevelList.reduce((acc, level, index) => {
  if (index >= loglevelIndex) {
    acc[level] = (...args) => {
      if (level === 'error') {
        level = clc.red(level);
      }
      if (level === 'warn') {
        level = clc.yellow(level);
      }
      if (level === 'info') {
        level = clc.blue(level);
      }
      if (level === 'log') {
        level = clc.magenta(level);
      }
      if (level === 'debug') {
        level = clc.cyan(level);
      }

      console.log(`[${level}] `, ...args);
    };
  } else {
    acc[level] = () => {};
  }
  return acc;
}, {});

module.exports = logFn;
