import { rest } from "msw";

const user = [
  {
    userEmail: "test@test.com",
    password: "1234",
  },
];

export const handlers = [
  rest.get("/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),
  // 로그인 할 때
  rest.post("/login", (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(201));
  }),
];
