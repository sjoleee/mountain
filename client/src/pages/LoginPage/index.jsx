import React, { useState, useEffect } from "react";
import mountainLogo from "@/assets/mountain.png";
import {
  LoginWrapper,
  LoginContainer,
  LogoContainer,
  LoginFormContainer,
  Logo,
  LoginFormBlock,
  LoginH1,
  StyledHr,
  StyledInput,
} from "@/pages/LoginPage/styles.jsx";
import Button from "../../components/common/Button";
import axios from "axios";

function LoginPage() {
  const [form, setForm] = useState({
    userEmail: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
    //setForm({ ...form, name: value });
    //console.log(form);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post("http://localhost:8000/auth/login", form)
      .then(function (response) {
        //console.log(response.data);
        setCookie("access_token", response.data["access-token"]);
      });
  };

  useEffect(() => {
    setForm({ userEmail: "", password: "" });
  }, []);

  return (
    <>
      <LoginWrapper>
        <LoginContainer>
          <LogoContainer>
            <Logo src={mountainLogo} />
          </LogoContainer>
          <LoginFormContainer>
            <LoginFormBlock onSubmit={onSubmit}>
              <LoginH1>LOGIN</LoginH1>
              <StyledHr />
              <StyledInput
                name="userEmail"
                placeholder="example@example.com"
                value={form.userEmail}
                onChange={onChange}
              />
              <StyledInput
                name="password"
                placeholder="password"
                type="password"
                value={form.password}
                onChange={onChange}
              />
              <Button fullWidth style={{ marginBottom: "10px" }} type="submit">
                LOGIN
              </Button>
              <span>
                Don't have an account?{" "}
                <a href="#" style={{ color: "red" }}>
                  Regsiter
                </a>
              </span>
            </LoginFormBlock>
          </LoginFormContainer>
        </LoginContainer>
      </LoginWrapper>
    </>
  );
}

export default LoginPage;
