import { rest } from "msw";
import { addImg, template } from "./mockdata";

const user = [];
const checkuser = {
  userEmail: "test@test.com",
  password: "1234",
};

const feeds = [...addImg];

export const handlers = [
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
  rest.get("/feed-data", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(feeds));
  }),
  rest.post("/feed-data", (req, res, ctx) => {
    const newFeed = {
      ...template,
      ...req.body,
    };
    feeds.unshift(newFeed);
    return res(ctx.status(201));
  }),
];
