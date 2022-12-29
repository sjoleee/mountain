import { atom } from "recoil";

const usernameState = atom({
  key: "usernameState",
  default: "",
});

const isLoginState = atom({
  key: "isLoginState",
  default: localStorage.getItem("access_token") !== null,
});

export { usernameState, isLoginState };
