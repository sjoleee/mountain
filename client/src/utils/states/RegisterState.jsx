import { atom } from "recoil";

const RegisterFormState = atom({
  key: "RegisterFormState",
  default: {
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    region: "",
    gender: "남자",
    age: 0,
  },
});

export { RegisterFormState };
