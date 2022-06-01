require("whatwg-fetch"); //polyfill for fetch in Nodejs
const { setupServer } = require("msw/node");
const { inProject } = require("@cesarcf/paths");
const { requireFile } = inProject();
const handlers = requireFile("<root>/config/msw.handlers.js", "<jest>/msw.handlers.js");

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);

// Establish API mocking before all tests.
// 'onUnhandledRequest' Specifies how to handle a request that is not listed in the request handlers.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
