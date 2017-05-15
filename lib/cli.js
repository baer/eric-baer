"use strict";

const program = require("commander");
const packageInfo = require("../package.json");

module.exports = () => {
  program
    .version(packageInfo.version)
    .usage("[command]");

  program
    .command("resume")
    .description("Open my resume")
    .action(() => {
      require("../src/open-resume.js")();
    });

  program
    .command("picture")
    .description("Show my profile picture")
    .action(() => {
      require("./picture.js")();
    });

  program
    .command("joke")
    .description("Tell a joke!")
    .action(() => {
      require("../src/tell-a-joke")();
    });

  program
    .command("advice")
    .description("Ask for advice")
    .action(() => {
      require("./advice.js")();
    });

  program.parse(process.argv);

  // By default, print the help cmd
  if (program.args.length === 0) {
    program.help();
  }
};
