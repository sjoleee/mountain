import React, { useEffect } from "react";
import styled from "styled-components";
import hikeLogo from "@/assets/hike_shoes.png";
import RegisterForm from "@/components/RegisterForm";
import { LoginFormState } from "../../utils/LoginState";
import { useRecoilState } from "recoil";

const RegisterWrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
  display:flex;
  justify-content:center;
  miniLogo
`;

const MiniLogo = styled.img`
  width: 2rem;
  height: 100%;
  line-height;
  padding-right:1rem;
`;

function RegisterPage() {
  return (
    <>
      <RegisterWrapper>
        <RegisterContainer>
          <RegisterLogo>
            <MiniLogo src={hikeLogo} />
            Mountain
          </RegisterLogo>
          <RegisterForm />
        </RegisterContainer>
      </RegisterWrapper>
    </>
  );
}

export default RegisterPage;
