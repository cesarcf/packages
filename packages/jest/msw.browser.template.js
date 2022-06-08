const { setupWorker } = require("msw");

//loads the msw handlers from the file
const handlers = require("./msw.handlers");
const worker = setupWorker(...handlers);

module.exports = worker;
