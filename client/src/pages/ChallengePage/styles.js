import styled from "styled-components";

export const ChallengePageBox = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ChallengefilterBox = styled.div`
  display: block;
  width: 60%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-content: center;
  background: #f2f2f2;
  border-radius: 1.5rem;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;
export const ChallengeListContainer = styled.div`
  height: 500px;
  width: 60%;
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    background: black;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transpert;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
export const ChallengeLevelBox = styled.div`
  width: 30%;
  height: auto;
  padding-top: 1rem;
`;
export const ChallengeConditionBox = styled.div`
  width: 30%;
  height: auto;
  padding-top: 1rem;
  display: flex;
  flex-direction: rows;
`;
export const ChallengeRankingBox = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const RankingImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

export const ChallengeRegionBox = styled.div`
  width: 30%;
  height: auto;
  padding-top: 1rem;
`;

export const ChallengeMenu = styled.span`
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: bold;
  font-display: swap;
  padding-right: 1rem;
`;

export const ChanllengeRegionSelect = styled.select`
  background: #e0e0e0;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: semibold;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: 2px solid rgba(96, 96, 96, 50%);
  border-radius: 5px;
  width: 120px;
  padding-left: 5%;
  height: auto;
  outline: none;

  &:focus {
    background: white;
  }
`;

export const addButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  top: 90%;
  left: 85%;
  color: white;
  background: black;
  border-radius: 50%;
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard";
  font-size: 3rem;
  font-weight: bold;
  font-display: swap;
`;
