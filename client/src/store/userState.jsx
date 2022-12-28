import { atom } from "recoil";

const userIdState = atom({
  key: "userIdState",
  default: "",
});

const isLoginState = atom({
  key: "isLoginState",
  default: localStorage.getItem("access_token") !== null,
});

export { userIdState, isLoginState };
