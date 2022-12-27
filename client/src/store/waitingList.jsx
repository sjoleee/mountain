import { atom } from "recoil";

const waitingListState = atom({
  key: "waitingListState",
  default: [],
});

export { waitingListState };
