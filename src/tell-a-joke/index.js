"use strict";

const {
  difference,
  flow,
  isEmpty,
  lowerCase,
  partialRight,
  trim
} = require("lodash");
const natural = require("natural");
const util = require("util");

const stopWords = require("./stop-words-en.json");
const jokes = require("../../data/jokes.json");

const tokenizer = new natural.WordTokenizer();

const ANSWER_DIFFERENCE_THRESHOLD = 0.2;

/**
 * Trim, tokenized and remove stopwords from input
 * @param String
 */
const parseText = flow(
  lowerCase,
  trim,
  (val) => tokenizer.tokenize(val),
  partialRight(difference, stopWords)
);

/**
 * Compare user input to correct input
 * @param  {String} answer       [description]
 * @param  {String} userResponse [description]
 * @return {Boolean}              [description]
 */
const inputMatchesExpected = (answer, userResponse) => {
  const tokenizedAnswer = parseText(answer);
  const tokenizedUserResponse = parseText(userResponse);

  // Allow for some small errors.
  const differenceThreshold = parseInt(tokenizedAnswer.length * ANSWER_DIFFERENCE_THRESHOLD, 10) || 1;
  const numberOfWordsDifferent = difference(tokenizedAnswer, tokenizedUserResponse);

  return numberOfWordsDifferent <= differenceThreshold;
};

/**
 * @return {Object} An Object containing a question and it's answer
 */
const getJoke = () => {
  return jokes.length > 0
    ? jokes[Math.floor(Math.random() * jokes.length)]
    : null;
};

module.exports = () => {
  const joke = getJoke();

  if (isEmpty(joke)) {
    console.log("Sorry, I don't know any good jokes...");
    process.exit();
  }

  console.log(joke.question);

  // Read from stdin even if it's in "old mode"
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  process.stdin.on("data", (text) => {
    if (inputMatchesExpected(joke.answer, util.inspect(text))) {
      console.log("You already know this one!");
      process.exit();
    }

    console.log(joke.answer);
    process.exit();
  });
};
