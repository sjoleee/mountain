import { atom } from "recoil";
import { getToken } from "../utils/localStorage";

const usernameState = atom({
  key: "usernameState",
  default: "",
});

const isLoginState = atom({
  key: "isLoginState",
  default: getToken("access_token") !== null,
});

export { usernameState, isLoginState };
