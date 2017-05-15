"use strict";

const { get, isEmpty, trimEnd } = require("lodash");
const request = require("request-promise-native");

const SUBREDDIT = "WorstAdviceEver";

const getRandomPost = (subreddit) => {
  return request({
    uri: `http://reddit.com/r/${subreddit}.json`,
    json: true // Automatically parses the JSON string in the response
  })
    .then((response) => {
      const posts = get(response, "data.children");
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      return get(randomPost, "data.permalink");
    })
    .then((urlFragment) => trimEnd(urlFragment, "/"));
};

const getRandomResponse = (redditPostURI) => {
  return request({
    uri: `http://reddit.com/${redditPostURI}.json`,
    json: true // Automatically parses the JSON string in the response
  })
    .then((response) => {
      // Oddly, the response body is an array with two elements where the first is the question node
      // and the second is the list of responses
      const responses = get(response, "[1].data.children");

      if (isEmpty(responses)) {
        return "Treat yo' self";
      }

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return get(randomResponse, "data.body");
    });
};

const getAdvice = () => {
  return getRandomPost(SUBREDDIT)
    .then(getRandomResponse);
};

module.exports = () => {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  console.log("Hello! I'm a programmed to help people make hard decisions. Ask me anything!");

  process.stdin.on("data", (text) => {
    getAdvice()
      .then((advice) => {
        console.log(advice);
        process.exit();
      });
  });
};
