import { rest } from "msw";
import { addImg, template, mountains, posts } from "./mockdata";

const user = [];
const checkuser = {
  userEmail: "test@test.com",
  password: "1234",
};

let feeds = [...addImg];

let feedId = 24;

const challenge = [];

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

  rest.post("/challenge/write", (req, res, ctx) => {
    challenge.push(req.body);
    console.log(challenge);
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

  rest.get("/mountains/:mountainId", (req, res, ctx) => {
    const { mountainId } = req.params;
    const find = mountains.find((mountain) => mountain.id == mountainId);
    return res(ctx.status(200), ctx.json(find));
  }),

  rest.get("search/mountains/:mountainName", (req, res, ctx) => {
    const { mountainName } = req.params;
    const find = mountains.find(
      (mountain) => mountain.mntiname == mountainName
    );
    return res(ctx.status(200), ctx.json(find));
  }),

  rest.get("map/posts", (req, res, ctx) => {
    const params = {};
    for (let [key, value] of req.url.searchParams.entries()) {
      params[key] = value;
    }
    const { swLat, swLng, neLat, neLng } = params;

    const filter = posts.filter(
      ({ position: { lat, lng } }) =>
        lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng
    );

    return res(ctx.status(200), ctx.json(filter));
  }),
];
