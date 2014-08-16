'use strict';

var program = require('commander');
var packageInfo = require('../package.json');
var jokes = require('./jokes.js');
var advice = require('./advice.js');

module.exports = function (argv) {
  program
    .version(packageInfo.version)
    .option('-j, --joke', 'tell a joke!')
    .option('-a, --advice', 'Ask for advice.')
    .parse(argv);

  // Tell some sweet jokes
  if (program.joke) {
    jokes();
  }

  // Tell some sweet jokes
  if (program.advice) {
    advice();
  }
};
