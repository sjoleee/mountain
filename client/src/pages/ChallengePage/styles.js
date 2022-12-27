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
  width: 70%;
  height: 250px;
  border: 1px solid #bdbdbd;
  display: flex;
  justify-content: center;
  box-shadow: 2px 2px 2px 2px #bdbdbd;
`;

export const RegionBox = styled.div`
  width: 29%;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

export const TierBox = styled.div`
  width: 29%;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

export const LevelBox = styled.div`
  width: 29%;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;
export const selectBox = styled.div`
  width: 13%;
  height: 100%;
`;
export const FilterTitleBox = styled.div`
  width: 100%;
  height: 33%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const FilterContents = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
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
  border-radius: 2px;
  transition: 0.4s;
  &:hover {
    color: #20c997;
  }
  &.backLevel {
    box-shadow: 0px 3px 0px 0px #9e9e9e;
    background: #eeeeee;
    margin-top: 5px;
    margin-bottom: 1px;
    margin-left: 2px;
    margin-right: 3px;
  }
`;

export const FilterText = styled.label`
  cursor: pointer;
  user-select: none;
`;

export const FilterTierContents = styled.div`
  width: 80%;
  height: auto;
  display: flex;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TierContentContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: 0.4s;
  &.backLevel {
    box-shadow: 0px 3px 0px 0px #9e9e9e;
    background: #eeeeee;
    margin-top: 5px;
    margin-bottom: 1px;
    margin-left: 2px;
    margin-right: 3px;
  }
`;

export const TierImg = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const TierName = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
`;

export const LevelContent = styled.div`
  width: 32%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const LevelContentContainer = styled.div`
  width: 50px;
  height: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  transition: 0.4s;

  &.backLevel {
    box-shadow: 0px 3px 0px 0px #9e9e9e;
    background: #eeeeee;
    margin-top: 5px;
    margin-bottom: 1px;
    margin-left: 2px;
    margin-right: 3px;
  }
`;

export const LevelImg = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Limg = styled.img`
  width: 40px;
  height: 40px;
`;
export const LevelName = styled.label`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: center;
`;

export const ChallengeListContainer = styled.div`
  height: 500px;
  width: 60%;
  margin-top: 2%;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
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
  cursor: pointer;
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
  cursor: pointer;
`;

export const selectRegionBox = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 25%;
`;
export const selectTitle = styled.div`
  width: 100%;
  height: 60%;
  border-bottom: 2px solid #bdbdbd;
  display: flex;
  align-items: center;
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: 400;
`;

export const selectContent = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 2px;
`;
export const titleSpan = styled.span`
  padding-left: 0.7rem;
`;
export const contentSpan = styled.span`
  padding-right: 0.7rem;
`;
export const selectTierBox = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 20%;
`;
export const selectLevelBox = styled.div`
  margin-top: 5px;
  width: 100%;
  height: 20%;
`;

export const selectButtonBox = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  top: 30px;
  display: flex;
  justify-content: flex-end;
`;
export const buttonDiv = styled.div`
  width: auto;
  height: auto;
  padding-right: 10px;
`;
export const sButtonImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 3px;
  padding-bottom: 1px;
`;
export const sButtonlabel = styled.label`
  margin-left: 5px;
  cursor: pointer;
`;

export const selectButton = styled.button`
  width: 32px;
  height: 30px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;
  & > img {
    transform: translateX(2px);
  }
  & > label {
    opacity: 0;
    width: 0;
  }
  &:hover {
    width: 90px;
    & > label {
      transition: 1s;
      width: auto;
      opacity: 1;
    }
  }
`;
