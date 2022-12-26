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

const mountains = [
  {
    id: "11108611",
    mntiname: "아차산",
    mntiadd: "경기 구리시 아천동",
    mntidetails: "아차산 상세 정보",
    mntihigh: 600,
    position: { lat: 37.56684449678786, lng: 127.10274196113546 },
  },
  {
    id: "11471124",
    mntiname: "북한산",
    mntiadd: "서울특별시 서대문구 홍은동",
    mntidetails:
      "북한산이 걸쳐있는 행정구역은 서울, 경기도의 많은 지자체에 걸쳐있는 큰 산이다. 그중 조사대상지역인 서울 서대문구 행정구역의 지형은 서울 서대문구 홍은2동지역을 감싸고 있는 형태이며, 남쪽으로는 홍제천을 바라보고 있다.조사대상지역은 북한산의 남쪽끝자락에 해당되며 능선을 따라 서대문구와 은평구로 행정구역이 나눠어지며, 구기터널 부근부터는 성벽을 따라 서대문구와 종로구로 나눠어진다. 서대문구에 속하는 지역은 지형이 그다지 험하지 않아 쉽게 등산이 가능하나, 조사지역경계 너머 북쪽 지역은 다소 지세가 험한 편이다. 일반등산로의 경우 그다지 등산이 어렵지는 않으나, 바위가 많은 곳은 경사가 심한곳이 많아 등산시 많은 주의가 필요하다.백두산, 지리산, 금간산, 묘향산과 함께 오악(五岳)에 포함될 정도로 자연경관이 매우 뛰어난 편이다. 비록 조사대상지역이 북한산끝자락에 속하지만 북한산 자연경관의 감상하기엔 부족함이 없다.",
    mntihigh: 850,
    position: { lat: 37.65865286599552, lng: 126.97799134593596 },
  },
  {
    id: "8184985",
    mntiname: "관악산",
    mntiadd: "서울 관악구 신림동",
    mntidetails: "관악산 상세 정보",
    mntihigh: 600,
    position: { lat: 37.44446951034434, lng: 126.96389684735281 },
  },
  {
    id: "8259558",
    mntiname: "도봉산",
    mntiadd: "서울 도봉구 도봉동",
    mntidetails: "도봉산 상세 정보",
    mntihigh: 600,
    position: { lat: 37.69884206393718, lng: 127.01545859321786 },
  },
];

const posts = [
  {
    id: "1",
    img: "https://xcrew.kr/crew/files/xcrewxn/766/154644/gallery_image2/%EB%93%B1%EC%82%B0.jpg",
    position: { lat: 37.66345676765, lng: 127.97543943997 },
  },
  {
    id: "2",
    img: "https://xcrew.kr/crew/files/xcrewxn/766/14069/gallery_image3/1584543215443-6.jpg",
    position: { lat: 37.6642135, lng: 127.0143943997 },
  },
  {
    id: "3",
    img: "https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/486f74ca2314b.jpeg",
    position: { lat: 37.652135, lng: 127.003943997 },
  },
  {
    id: "4",
    img: "https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/0e4a3cf2b6059.jpeg",
    position: { lat: 37.643135, lng: 127.0013943997 },
  },
  {
    id: "5",
    img: "https://xcrew.kr/xcrewtest/www/files/xcrewxn/766/5894/gallery_image2/8ED302AD-5B9B-436F-B2E4-651B18E9A07D.jpeg?1615100703",
    position: { lat: 36.334349439, lng: 127.0154521786 },
  },
  {
    id: "6",
    img: "https://blog.kakaocdn.net/dn/d5m8FQ/btqDc4yzyCO/C5dmyaX3zl4nxSTkxxOAGk/img.jpg",
    position: { lat: 37.45546657, lng: 127.5655788544 },
  },
  {
    id: "7",
    img: "https://xcrew.kr/crew/files/xcrewxn/766/154644/gallery_image2/%EB%93%B1%EC%82%B0.jpg",
    position: { lat: 37.65549439, lng: 127.0859321786 },
  },
  {
    id: "8",
    img: "https://i1.daumcdn.net/thumb/C230x300/?fname=https://blog.kakaocdn.net/dn/sw7eA/btrrpTA16j5/k1rIPy8VReswvVoWOHrEYk/img.jpg",
    position: { lat: 37.334349439, lng: 127.6776859321786 },
  },
  {
    id: "9",
    img: "https://thumb.mtstarnews.com/06/2021/07/2021072322102310532_1.jpg/dims/optimize",
    position: { lat: 37.4349439, lng: 127.409404889 },
  },
  {
    id: "10",
    img: "https://image.ytn.co.kr/osen/2021/07/2a6bb49a-4787-4f9e-9606-fab6185726cc.jpg",
    position: { lat: 36.3434232, lng: 127.432943943 },
  },
  {
    id: "11",
    img: "https://cdn.topstarnews.net/news/photo/first/201706/img_273994_1.jpg",
    position: { lat: 35.86549439, lng: 126.43943943 },
  },
  {
    id: "12",
    img: "https://img.hankyung.com/photo/202107/01.26845486.1.jpg",
    position: { lat: 37.4354359439, lng: 127.00943943 },
  },
  {
    id: "13",
    img: "https://cdn.imweb.me/upload/S2021011502a2f4eeeb339/a17a780f0649f.jpeg",
    position: { lat: 37.863339, lng: 127.43943943 },
  },
  {
    id: "14",
    img: "https://blog.kakaocdn.net/dn/cPe8ot/btqTSUyNuQf/lIu4LfhO7vOOPq2Y8LKeq1/img.jpg",
    position: { lat: 37.1249439, lng: 127.00943 },
  },
  {
    id: "15",
    img: "https://xcrew.kr/crew/files/xcrewxn/766/154644/gallery_image2/%EB%93%B1%EC%82%B0.jpg",
    position: { lat: 36.895494333, lng: 126.223943 },
  },
  {
    id: "16",
    img: "https://cdn.casenews.co.kr/news/photo/202103/4108_14664_2853.jpg",
    position: { lat: 37.0549439, lng: 127.00943943 },
  },
  {
    id: "17",
    img: "https://pds.joongang.co.kr/news/component/joongang_sunday/201902/24/aac3840e-13c0-465a-b951-8338f90a34f8.jpg",
    position: { lat: 37.13549439, lng: 127.5363943 },
  },
];
