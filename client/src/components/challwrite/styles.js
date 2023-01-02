import styled, { css } from "styled-components";

export const CwriteForm = styled.form`
  width: 90%;
  height: 700px;
  display: flex;
  justify-content: space-around;
`;

export const CwriteFirst = styled.div`
  width: 45%;
  height: 100%;
`;

export const CwriteSecond = styled.div`
  width: 45%;
  height: 100%;
`;

export const CwBasicContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CwLabelContainer = styled.div`
  width: 20%;
`;
export const CwInputContinaer = styled.div`
  width: 80%;
  display: flex;
  padding-right: 2rem;
  padding-left: 2rem;
  align-items: center;
`;
export const CwInputContinaer2 = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  padding-left: 2rem;
  align-items: center;
`;
export const CwFormLabel = styled.label`
  font-family: "Pretendard";
  width: 200px;
  font-size: 1.25rem;
  font-weight: semibold;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

export const CwFormStyledInput = styled.input`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 1.5px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: 96%;
  height: 30px;
  outline: none;
  box-shadow: none;
  padding-left: 3%;

  & + & {
    margin-left: 10px;
  }
  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;

export const CwPeriodContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CwLogoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CwFormTextArea = styled.textarea`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 1.5px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: 100%;
  height: 200px;
  outline: none;
  box-shadow: none;
  padding-left: 3%;
  padding-top: 3%;
  margin-bottom: 0.5rem;

  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;

export const HashtagList = styled.div`
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: black;
  display: flex;
`;

export const submitPosition = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  top: 45%;
  display: flex;
  justify-content: flex-end;
`;

export const CwFormSelect = styled.select`
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

export const mountainName = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  margin-top: 2px;
  overflow: auto;
`;

export const mountainNameli = styled.li`
  width: 100%;
  height: 20px;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  margin-top: 2px;
`;
