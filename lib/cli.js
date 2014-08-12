'use strict';

var program = require('commander');
var packageInfo = require('../package.json');
var jokes = require('./jokes.js');

module.exports = function (argv) {
  program
    .version(packageInfo.version)
    .option('-j, --joke', 'tell a joke!')
    .parse(argv);

  // Tell some sweet jokes
  if (program.joke) {
    jokes();
  }
};
