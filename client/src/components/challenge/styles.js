import styled from "styled-components";

export const ChallengeCard = styled.div`
  width: 440px;
  height: 200px;
  margin-top: 2rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border: 1px solid #bdbdbd;
  border-radius: 15px;
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-weight: semibold;
  font-display: swap;
  transition: 0.5s;
  &:hover {
    transform: translateY(-10px);
  }
  &:active {
    transform: scale(1.05);
  }
`;

export const CardWrap = styled.div`
  width: 100%;
  height: 130px;
  position: relative;
`;
export const CardImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
  opacity: 0.6;
`;

export const CardTitle = styled.div`
  width: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CardInfoContainer = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 0 0 15px 15px;
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

export const CardInfoWrap = styled.div`
  width: 200px;
  height: auto;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
`;

export const CardSubInfoWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.7rem;
`;
export const CardTimer = styled.div`
  width: 180px;
  height: auto;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  & > img {
    transform: translateX(40px);
  }
  & > span {
    transform: translateX(30px);
  }
`;
