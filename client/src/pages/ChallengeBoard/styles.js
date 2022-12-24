import styled from "styled-components";

export const BoardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CBContainer = styled.div`
  display: flex;
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
`;

export const CBFirst = styled.div`
  width: 45%;
  height: 100%;
  border: 1px solid black;
`;

export const CBSecond = styled.div`
  width: 45%;
  height: 100%;
  border: 1px solid black;
`;

export const CBTitleContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CBLabel = styled.label`
  font-family: "Pretendard";
  width: 300px;
  font-size: 1.8rem;
  font-weight: semibold;
  padding-left: 1rem;
`;

export const miniCBLabel = styled.label`
  font-family: "Pretendard";
  width: 200px;
  font-size: 1.4rem;
  font-weight: semibold;
  padding-left: 1rem;
`;

export const CBBasicContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CBImageContainer = styled.div`
  width: 40%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
`;

export const CBImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const CBInfoContainer = styled.div`
  width: 60%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CBInfoLine = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid black;
  display: flex;
`;

export const CBInfotitle = styled.div`
  width: 25%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-weight: 500;
`;
export const CBInfoh3 = styled.span`
  padding-left: 1rem;
`;

export const CBInfocontent = styled.div`
  width: 60%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export const CBLeaderContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  margin-bottom: 1rem;
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
`;

export const CBMemberContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
`;

export const CBMemberTitle = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export const CBMembersub = styled.span`
  padding-left: 1rem;
`;

export const CBMember = styled.div`
  width: 100%;
  height: 170px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export const LevelContainer = styled.div`
  width: 100%;
  height: 50px;
  margin: 1rem 0;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export const CBLevelspan = styled.span`
  padding-left: 3rem;
`;

export const CBtaContainer = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid black;
`;
export const CBTextArea = styled.textarea`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 1.5px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: 93%;
  height: 130px;
  outline: none;
  box-shadow: none;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 3%;
  margin-bottom: 0.5rem;
`;

export const CBfeedContainer = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
`;

export const CBMargin = styled.div`
  width: 100%;
  height: 2rem;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  left: 89%;
  top: 12%;
  width: 90px;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-itmes: center;
`;