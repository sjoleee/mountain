import { atom } from "recoil";

const peopleListState = atom({
  key: "peopleListState",
  default: [],
});

export { peopleListState };
