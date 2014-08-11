'use strict';

var jokes = require('../jokes/jokes.json');
var stopWords = require('./stop-words-en.json');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var _ = require('underscore');
var util = require('util');

var userKnowsTheJoke = function (answer, userResponse) {
  var answer = answer.toLowerCase().trim();
  var userResponse = userResponse.toLowerCase().trim();

  var tokenizedAnswer = _.difference(tokenizer.tokenize(answer), stopWords);
  var tokenizedUserResponse = _.difference(tokenizer.tokenize(userResponse), stopWords);

  var numberOfWordsDifferent = _.difference(tokenizedAnswer, tokenizedUserResponse);
  var differenceThreshold = parseInt(tokenizedAnswer.length * .2, 10);

  return numberOfWordsDifferent <= differenceThreshold;
};

var getJoke = function () {
  jokes[Math.random() % jokes.length];
}

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
