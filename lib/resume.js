'use strict';

var open = require('open');
var glob = require('glob');

module.exports = function () {
  glob(__dirname + '/../me/*esume.pdf', function (err, files) {
    if (files.length > 0) {
      open(files[0]);
    } else {
      console.log('Sorry, I couldn\'t find a resume to show you');
    }
    process.exit();
  });
};