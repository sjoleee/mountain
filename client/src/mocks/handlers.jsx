import { rest } from "msw";

const user = [];
const checkuser = {
  userEmail: "test@test.com",
  password: "1234",
};
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
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          type: "일반",
          title: "제목1",
          tag: [],
          profileImg: "프로필사진1",
          author: "유저1",
          img: "mockimg",
          content: "본문 입니다.",
          comment: [
            { id: 1, username: "user1", content: "좋아요~!" },
            { id: 2, username: "user2", content: "멋져요~!" },
          ],
          likes: 0,
        },
        {
          id: 2,
          type: "챌린지",
          title: "제목2",
          tag: [],
          profileImg: "프로필사진2",
          author: "유저2",
          img: "mockimg",
          content: "본문 입니다2.",
          comment: [
            { id: 1, username: "user1", content: "좋아요~!" },
            { id: 2, username: "user2", content: "멋져요~!" },
          ],
          likes: 10,
        },
      ])
    );
  }),
];
