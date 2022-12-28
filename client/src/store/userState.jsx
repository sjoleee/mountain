import { atom } from "recoil";

const userIdState = atom({
  key: "userIdState",
  default: "",
});

export { userIdState };
