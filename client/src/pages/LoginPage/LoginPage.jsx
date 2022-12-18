import React, { useEffect } from "react";
import styled from "styled-components";
import mountainLogo from "@/assets/mountain.png";
import LoginForm from "@/components/LoginForm.jsx";
import { LoginFormState } from "../../utils/LoginState";
import { useRecoilState } from "recoil";

const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  width: 1200px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const LogoContainer = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginFormContainer = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.img`
  width: 500px;
  height: 500px;
`;

function LoginPage() {
  const [form, setForm] = useRecoilState(LoginFormState);
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
            <LoginForm form={form} onChange={onChange} onSubmit={onSubmit} />
          </LoginFormContainer>
        </LoginContainer>
      </LoginWrapper>
    </>
  );
}

export default LoginPage;
