import React from "react";
import styled from "styled-components";
import Button from "./common/Button";

const LoginFormBlock = styled.form`
  padding-left: 50px;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 150px;
`;

const LoginH1 = styled.h1`
  font-family: "Pretendard";
  font-size: 3rem;
  font-weight: 150;
  font-display: swap;
`;

const StyledHr = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(96, 96, 96, 50%);
  border: 0;
  margin-bottom: 30px;
`;

const StyledInput = styled.input`
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

const LoginForm = ({ form, onChange, onSubmit }) => {
  return (
    <>
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
    </>
  );
};

export default LoginForm;
