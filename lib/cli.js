"use strict";

var program = require("commander");
var packageInfo = require("../package.json");

module.exports = function (argv) {
  program
    .version(packageInfo.version)
    .usage("[command]");

  program
    .command("resume")
    .description("Open my resume")
    .action(function () {
      require("./resume.js")();
    });

  program
    .command("picture")
    .description("Show my profile picture")
    .action(function () {
      require("./picture.js")();
    });

  program
    .command("joke")
    .description("Tell a joke!")
    .action(function () {
      require("./jokes.js")();
    });

  program
    .command("advice")
    .description("Ask for advice")
    .action(function () {
      require("./advice.js")();
    });

  program.parse(process.argv);

  // By default, print the help cmd
  if (program.args.length === 0) {
    program.help();
  }
};
