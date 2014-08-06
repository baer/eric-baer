'use strict';

var program = require('commander'),
  packageInfo = require('../package.json');

module.exports = function (argv) {
  program
    .version(packageInfo.version)
    .parse(argv);
};
