"use strict";

const { isEmpty, first } = require("lodash");
const pify = require("pify");
const glob = pify(require("glob"));
const open = require("open");

const getResumePath = () => {
  return glob(__dirname + "/../me/*esume.pdf")
    .then(first);
};

module.exports = function () {
  getResumePath()
    .then((filePath) => {
      if (filePath) {
        open(filePath);
      } else {
        console.log("Sorry, I couldn't find a resume to show you");
      }

      process.exit();
    })
};
