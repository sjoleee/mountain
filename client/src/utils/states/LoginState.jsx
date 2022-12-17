import { atom } from "recoil";

const LoginFormState = atom({
  key: "LoginFormState",
  default: {
    userEmail: "",
    password: "",
  },
});

export { LoginFormState };
