import styled from "styled-components";

export const ChallengePageBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 5rem;
`;

export const ChallengefilterBox = styled.div`
  display: block;
  width: 60%;
  height: 250px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
`;

export const RegionBox = styled.div`
  width: 33%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export const TierBox = styled.div`
  width: 33%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export const LevelBox = styled.div`
  width: 33%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export const FilterTitleBox = styled.div`
  width: 100%;
  height: 33%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: bold;
`;

export const FilterContentBox = styled.div`
  width: 100%;
  height: 67%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const FilterContents = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  border: 1px solid black;
  flex-directions: row;
  flex-wrap: wrap;
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: semibold;
  transition: 0.5s;
`;

export const FilterContent = styled.div`
  width: 66px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  pointer: cursor;
  &:hover {
    color: #20c997;
    border: 3px solid rgba(32, 201, 151, 0.5);
  }
`;

export const FilterText = styled.label`
  pointer: cursor;
`;

export const FilterTierContents = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  border: 1px solid black;
  flex-directions: row;
  flex-wrap: wrap;
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: semibold;
  transition: 0.5s;
  justify-content: center;
  align-content: center;
`;
export const TierContent = styled.div`
  width: 32%;
  height: 70px;
  border: 1px solid black;
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
// export const ChallengeLevelBox = styled.div`
//   width: 30%;
//   height: auto;
//   padding-top: 1rem;
// `;
// export const ChallengeConditionBox = styled.div`
//   width: 30%;
//   height: auto;
//   padding-top: 1rem;
//   display: flex;
//   flex-direction: rows;
// `;
// export const ChallengeRankingBox = styled.div`
//   width: 50%;
//   height: auto;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// `;

// export const RankingImage = styled.img`
//   width: 30px;
//   height: 30px;
//   margin-right: 5px;
// `;

// export const ChallengeRegionBox = styled.div`
//   width: 30%;
//   height: auto;
//   padding-top: 1rem;
// `;

// export const ChallengeMenu = styled.span`
//   font-family: "Pretendard";
//   font-size: 1.2rem;
//   font-weight: bold;
//   font-display: swap;
//   padding-right: 1rem;
// `;

// export const ChanllengeRegionSelect = styled.select`
//   background: #e0e0e0;
//   font-family: "Pretendard";
//   font-size: 1.4rem;
//   font-weight: semibold;
//   font-display: swap;
//   color: rgba(0, 0, 0, 80%);
//   border: 2px solid rgba(96, 96, 96, 50%);
//   border-radius: 5px;
//   width: 120px;
//   padding-left: 5%;
//   height: auto;
//   outline: none;

//   &:focus {
//     background: white;
//   }
// `;

export const addButton = styled.div`
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
  transition: 1s;
  pointer: cursor;
  &:hover {
    color: black;
    background: white;
    transform: scale(1.1);
  }
  &:active {
    top: 89%;
  }
`;

export const logoutButton = styled.button`
  width: 250px;
  height: 50px;
  position: fixed;
  top: 0%;
  left: 0%;
  color: white;
  background: black;
  border-radius: 10px;
  display: flex;
  border: none;
  pointer: cursor;
  justify-content: center;
  align-items: center;
`;

export const addLogoSpan = styled.span`
  font-family: "Pretendard";
  font-size: 3rem;
  font-weight: bold;
  font-display: swap;
  padding-bottom: 0.3rem;
  padding-left: 0.05rem;
`;
