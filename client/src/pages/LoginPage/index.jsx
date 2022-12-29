import React, { useState, useEffect } from "react";
import mountainLogo from "@/assets/mountain.png";
import * as al from "@/pages/LoginPage/styles.js";
import Button from "../../components/common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState } from "@/store/userState";
import { postUserLogin } from "@/apis";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [username, setUsername] = useRecoilState(usernameState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await postUserLogin(form);
    //const response = await axios.post("http://localhost:8000/auth/login", form);
    if (response.status === 201) {
      const userid = response.data.id;
      localStorage.setItem("access_token", response.data["access_token"]);
      localStorage.setItem("userId", userid);
      localStorage.setItem("userRole", response.data.roles);
      localStorage.setItem("username", response.data.username);
      setUsername(response.data.username);
      //console.log(userid);
      navigate("/challenge");
    }
  };

  useEffect(() => {
    setForm({ email: "", password: "" });
  }, []);

  return (
    <>
      <al.LoginWrapper>
        <al.LoginContainer>
          <al.LogoContainer>
            <al.Logo src={mountainLogo} />
          </al.LogoContainer>
          <al.LoginFormContainer>
            <al.LoginFormBlock onSubmit={onSubmit}>
              <al.LoginH1>LOGIN</al.LoginH1>
              <al.StyledHr />
              <al.StyledInput
                name="email"
                placeholder="example@example.com"
                value={form.email}
                onChange={onChange}
              />
              <al.StyledInput
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
                <a href="/register" style={{ color: "red" }}>
                  Regsiter
                </a>
              </span>
            </al.LoginFormBlock>
          </al.LoginFormContainer>
        </al.LoginContainer>
      </al.LoginWrapper>
    </>
  );
}

export default LoginPage;
