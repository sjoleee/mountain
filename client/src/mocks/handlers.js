import { rest } from "msw";
import { addImg, template } from "./mockdata";

const user = [];
const checkuser = {
  userEmail: "test@test.com",
  password: "1234",
};

let feeds = [...addImg];

let feedId = 24;

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
    const feedId = req.url.searchParams.get("feed-id");
    if (feedId) {
      const feedData = feeds.find((feed) => feed.id === Number(feedId));
      return res(ctx.status(200), ctx.json(feedData));
    }

    return res(ctx.status(200), ctx.json(feeds));
  }),
  rest.post("/feed-data", (req, res, ctx) => {
    const newFeed = {
      ...template,
      ...req.body,
      id: feedId,
    };
    feedId += 1;
    feeds = [newFeed, ...feeds];
    return res(ctx.status(201));
  }),
];
