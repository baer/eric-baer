'use strict';

var program = require('commander');
var packageInfo = require('../package.json');
var jokes = require('./jokes.js');
var advice = require('./advice.js');
var resume = require('./resume.js');

module.exports = function (argv) {
  program
    .version(packageInfo.version)
    .option('-r, --resume', 'Open my resume')
    .option('-j, --joke',   'tell a joke!')
    .option('-a, --advice', 'Ask for advice.')
    .parse(argv);

  // Tell some sweet jokes
  if (program.joke) {
    jokes();
  }

  // Give a little advice
  if (program.advice) {
    advice();
  }

  // Open my resume
  if (program.resume) {
    resume();
  }
};
