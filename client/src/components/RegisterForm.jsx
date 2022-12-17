import React from "react";
import styled from "styled-components";
import Button from "./common/Button";

const RegisterFormBlock = styled.form`
  width: auto;
  margin: 2rem 3rem;
  padding: 0 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ReFormName = styled.h1`
  font-family: "Pretendard";
  width: 100%;
  font-size: 1.4rem;
  font-weight: semibold;
  margin: 2rem 0;
`;

const ReFormLabel = styled.label`
  display: block;
  font-family: "Pretendard";
  width: 100%;
  font-size: 1.25rem;
  font-weight: semibold;
  margin-bottom: 1rem;
`;

const ReFormStyledInput = styled.input`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 1.5px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: 96%;
  height: 40px;
  outline: none;
  box-shadow: none;
  padding-left: 3%;
  margin-bottom: 1rem;

  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;

const ReFormSelect = styled.select`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 1.5px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: auto;
  padding-left: 2%;
  height: 45px;
  outline: none;
  margin-bottom: 1rem;

  &:focus {
    background: white;
  }
`;

const RegisterForm = ({ form, onChange, onSubmit }) => {
  return (
    <>
      <RegisterFormBlock onSubmit={onSubmit}>
        <ReFormName>계정 생성</ReFormName>
        <ReFormLabel>이메일 : </ReFormLabel>
        <ReFormStyledInput
          placeholder="test@test.com"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
        />
        <ReFormLabel> 비밀번호 : </ReFormLabel>
        <ReFormStyledInput
          placeholder="******"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
        />
        <ReFormLabel> 비밀번호 확인 : </ReFormLabel>
        <ReFormStyledInput
          placeholder="******"
          type="password"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={onChange}
        />
        <ReFormLabel> 전화번호 : </ReFormLabel>
        <ReFormStyledInput
          placeholder="010-1234-5678"
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
        />
        <ReFormLabel> 지역 : </ReFormLabel>
        <ReFormSelect name="region" value={form.region} onChange={onChange}>
          <option>경기도</option>
          <option>충청도</option>
          <option>전라도</option>
          <option>경상도</option>
          <option>강원도</option>
          <option>평안도</option>
          <option>함경도</option>
          <option>황해도</option>
        </ReFormSelect>
        <ReFormLabel> 성별 : </ReFormLabel>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              checked={form.gender === "남자"}
              onChange={onChange}
              value="남자"
            />
            남자
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              checked={form.gender === "여자"}
              onChange={onChange}
              value="여자"
            />
            여자
          </label>
        </div>
        <ReFormLabel> 나이 : </ReFormLabel>
        <ReFormStyledInput
          placeholder="00"
          type="number"
          name="age"
          value={form.age}
          onChange={onChange}
        />
        <Button fullWidth>Create an account</Button>
      </RegisterFormBlock>
    </>
  );
};

export default RegisterForm;
