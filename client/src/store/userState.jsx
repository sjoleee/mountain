import { atom } from "recoil";

const usernameState = atom({
  key: "usernameState",
  default: "",
});

export { usernameState };
