import { atom } from "recoil";

export const ModalOn = atom({
  key: "modalOn",
  default: false,
});

export const formData = atom({
  key: "FormData",
  defaut: {
    title: "",
    content: "",
    tag: [],
    lat: "",
    lng: "",
  },
});
