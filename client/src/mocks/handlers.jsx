import { rest } from "msw";

const user = [];
const checkuser = {
  userEmail: "test@test.com",
  password: "1234",
};
const challenge = [];
export const handlers = [
  rest.post("/challenge/write", (req, res, ctx) => {
    challenge.push(req.body);
    console.log(challenge);
    return res(ctx.status(201));
  }),
  rest.get("/login", (req, res, ctx) => {
    const body = req.body;
    if (checkuser.userEmail === body.userEmail) {
      if (checkuser.password === body.password) {
        return res(ctx.status(200), ctx.json(user));
      }
    }
    return res(ctx.status(400));
  }),
  // 로그인 할 때
  rest.post("/login", (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(201));
  }),
  rest.post("/register", (req, res, ctx) => {
    user.push(req.body);
    return res(ctx.status(201));
  }),
];
