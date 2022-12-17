import React, { useEffect } from "react";
import styled from "styled-components";
import hikeLogo from "@/assets/hike_shoes.png";
import RegisterForm from "@/components/RegisterForm";
import { RegisterFormState } from "../../utils/states/RegisterState";
import { useRecoilState } from "recoil";

const RegisterWrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterContainer = styled.div`
  width: 45%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
`;

const RegisterLogo = styled.a`
  font-family: "Pretendard";
  width: 100%;
  font-size: 2rem;
  font-weight: semibold;
  font-display: swap;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const MiniLogo = styled.img`
  width: 2rem;
  height: 100%;
  line-height;
  padding-right:1rem;
`;

function RegisterPage() {
  const [registerform, registerSetForm] = useRecoilState(RegisterFormState);
  const onChange = (e) => {
    const { name, value } = e.target;
    registerSetForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
    //setForm({ ...form, name: value });
    //console.log(form);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(registerform);
    registerform.password !== registerform.passwordConfirm
      ? console.log("비밀번호가 틀립니다.")
      : null;
  };

  return (
    <>
      <RegisterWrapper>
        <RegisterContainer>
          <RegisterLogo>
            <MiniLogo src={hikeLogo} style={{ marginTop: "2px" }} />
            Mountain
          </RegisterLogo>
          <RegisterForm
            form={registerform}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </RegisterContainer>
      </RegisterWrapper>
    </>
  );
}

export default RegisterPage;
