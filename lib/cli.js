'use strict';

var program = require('commander');
var packageInfo = require('../package.json');

var jokes = require('./jokes.js');
var advice = require('./advice.js');
var resume = require('./resume.js');

module.exports = function (argv) {
  program
    .version(packageInfo.version)
    .usage('[command]');

  program
    .command('resume')
    .description('Open my resume')
    .action(function() {
      resume();
    });

  program
    .command('joke')
    .description('Tell a joke!')
    .action(function() {
      jokes();
    });

  program
    .command('advice')
    .description('Ask for advice')
    .action(function() {
      advice();
    });

  program.parse(process.argv);

  // By default, print the help cmd
  if (program.args.length === 0) {
    program.help();
  }
};
