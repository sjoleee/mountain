import styled from "styled-components";

export const RegisterWrapper = styled.div`
  width: 100vw;
  margin: 0 auto;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterContainer = styled.div`
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

export const RegisterLogo = styled.a`
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

export const MiniLogo = styled.img`
  width: 2rem;
  height: 100%;
  line-height;
  padding-right:1rem;
`;
export const RegisterFormBlock = styled.form`
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

export const ReFormName = styled.h1`
  font-family: "Pretendard";
  width: 100%;
  font-size: 1.4rem;
  font-weight: semibold;
  margin: 2rem 0;
`;

export const ReFormLabel = styled.label`
  display: block;
  font-family: "Pretendard";
  width: 100%;
  font-size: 1.25rem;
  font-weight: semibold;
  margin-bottom: 1rem;
`;

export const ReFormStyledInput = styled.input`
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
  margin-bottom: 0.5rem;

  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;

export const ReFormSelect = styled.select`
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

export const ReFormStateLabel = styled.label`
  border: none;
  border-radius: 4px;
  font-family: "Pretendard";
  font-size: 1rem;
  font-weight: 150;
  font-display: swap;
  outline: none;
  margin-bottom: 1rem;
`;

export const ReFormImageContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const ReFormProfile = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 70%;
`;
