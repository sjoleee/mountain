import styled from "styled-components";

export const CardContainer = styled.div`
  width: 200px;
  height: 150px;
  border: 1px solid gray;
  border-radius: 10px;
`;

export const CardInfoContainer = styled.div`
  width: 100%;
  height: 70px;
  border: 1px solid black;
  margin-top: 17px;
  display: flex;
`;

export const CardInfoImg = styled.div`
  width: 35%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardInfoContent = styled.div`
  width: 65%;
  height: 100%;
`;
export const CardImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const CardUser = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;

export const Cardtier = styled.div`
  width: 15px;
  height: 15px;
  border: 1px solid black;
  margin-left: 10px;
`;

export const Cardname = styled.div`
  width: 65%;
  height: 15px;
  border: 1px solid black;
  margin-left: 10px;
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: 300;
  font-display: swap;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const CardBadge = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  margin-top: 5px;
`;

export const CardIntro = styled.div`
  width: 100%;
  height: 60px;
`;

export const CardIntroText = styled.span`
  padding: 10px;
  font-family: "Pretendard";
  font-size: 1.1rem;
  font-weight: 300;
  font-display: swap;
`;
