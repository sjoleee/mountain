import styled from "styled-components";

export const FeedCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
  border-radius: 32px;
  transition: transform 0.3s;
  /* background-color: white; */
  /* box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px; */
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px; */

  /* border: 0.7px solid rgba(0, 0, 0, 0.4); */

  &:hover {
    transform: scale(1.03);
    z-index: 5;
    cursor: pointer;
  }
`;

export const FeedCardImg = styled.img`
  width: 100%;
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px; */
  border-radius: 15px;
  margin-bottom: 3px;
  transition: filter 0.2s;
  filter: blur(20px);
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px; */
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
`;

export const Title = styled.p`
  display: flex;
  flex: 1;
  font-weight: bold;
  font-size: 12px;
  margin: 0;
  padding: 0 15px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0 15px;
  align-items: center;
  height: 24px;
`;

export const ProfileImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const ProfileUserName = styled.p`
  font-size: 12px;
  flex: 1;
`;
