require("whatwg-fetch"); //polyfill for fetch in Nodejs
const { setupServer } = require("msw/node");
const { rest } = require("msw");
const { inProject } = require("@cesarcf/paths");
const { requireFile } = inProject();
const handlers = requireFile("<root>/config/msw.handlers.js", "<jest>/msw.handlers.template.js");

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

// Establish API mocking before all tests.
// 'onUnhandledRequest' Specifies how to handle a request that is not listed in the request handlers.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that we may add during the tests (runtime request handler)
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

global.msw = {
  server,
  rest,
};
