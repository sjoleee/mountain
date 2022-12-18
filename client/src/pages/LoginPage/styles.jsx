import styled from "styled-components";

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginContainer = styled.div`
  width: 1200px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

export const LogoContainer = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginFormContainer = styled.div`
  width: 600px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.img`
  width: 500px;
  height: 500px;
`;

export const LoginFormBlock = styled.form`
  padding-left: 50px;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 150px;
`;

export const LoginH1 = styled.h1`
  font-family: "Pretendard";
  font-size: 3rem;
  font-weight: 150;
  font-display: swap;
`;

export const StyledHr = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(96, 96, 96, 50%);
  border: 0;
  margin-bottom: 30px;
`;

export const StyledInput = styled.input`
  font-family: "Pretendard";
  font-size: 1.5rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 1.5px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: 96%;
  height: 45px;
  box-shadow: none;
  padding-left: 3%;
  & + & {
    margin-top: 20px;
  }
`;
