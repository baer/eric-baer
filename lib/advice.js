"use strict";

/* global -Promise */
var Promise = require("bluebird");
var request = require("request");

var getAdvice = function () {
  return new Promise(function (resolve, reject) {
    // GET a random post from reddit's /r/WorstAdviceEver
    request("http://reddit.com/r/WorstAdviceEver.json", function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var posts = JSON.parse(body).data.children;
        var randomPostURI = posts[Math.floor(Math.random() * posts.length)].data.permalink;

        // GET a random answer
        request("http://reddit.com" + randomPostURI + ".json", function (error, response, body) {
          if (!error && response.statusCode === 200) {
            if (!JSON.parse(body)[1]) {
              resolve("Treat yo' self");
            } else {
              var responses = JSON.parse(body)[1].data.children;
              var randomResponseIndex = Math.floor(Math.random() * responses.length);
              resolve(responses[randomResponseIndex].data.body);
            }
          }
        });
      }
    });
  });
};

module.exports = function () {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  console.log("Hello! I'm a programmed to help people make hard decisions. Ask me anything!");

  process.stdin.on("data", function (text) {
    getAdvice()
      .then(function (advice) {
        console.log(advice);
        process.exit();
      });
  });
};
