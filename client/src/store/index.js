import axios from "axios";
import { selector } from "recoil";

export const testData = selector({
  key: "tData",
  get: async () => {
    const response = await axios.get("/feed-data");
    return response.data;
  },
});
