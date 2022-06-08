const { rest } = require("msw");

const handlers = [
  // Handles a POST /login request example
  rest.post("/login", (req, res, ctx) => {
    return res(ctx.json({ mensaje: "example" }));
  }),
  // Handles a GET /user request example
  rest.get("/user", (req, res, ctx) => {
    return res(ctx.json({ mensaje: "example" }));
  }),
];

module.exports = handlers;
