'use strict';

var stopWords = require('./stop-words-en.json');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var _ = require('underscore');
var util = require('util');
var fs = require('fs');

var ANSWER_DIFFERENCE_THRESHOLD = .8;

var userKnowsTheJoke = function (answer, userResponse) {
  var answer = answer.toLowerCase().trim();
  var userResponse = userResponse.toLowerCase().trim();

  var tokenizedAnswer = _.difference(tokenizer.tokenize(answer), stopWords);
  var tokenizedUserResponse = _.difference(tokenizer.tokenize(userResponse), stopWords);

  // Allow for some small errors.
  var differenceThreshold = parseInt(tokenizedAnswer.length * 1 - ANSWER_DIFFERENCE_THRESHOLD, 10) || 1;
  var numberOfWordsDifferent = _.difference(tokenizedAnswer, tokenizedUserResponse);

  return numberOfWordsDifferent <= differenceThreshold;
};

var getJoke = function () {
  if (fs.existsSync('../me/jokes.json')) {
    var jokes = require('../me/jokes.json');
    return jokes[Math.floor(Math.random() * jokes.length)];
  } else {
    console.log('Sorry, I don\'t know any good jokes...');
    process.exit();
  }
}

module.exports = function () {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var joke = getJoke();

  console.log(joke.question);

  process.stdin.on('data', function (text) {
    if (userKnowsTheJoke(joke.answer, util.inspect(text))) {
      console.log('You already know this one!');
      process.exit();
    }

    console.log(joke.answer);
    process.exit();
  });
};
