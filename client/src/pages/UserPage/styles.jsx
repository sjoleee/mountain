import styled from "styled-components";

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const UserLeftInfoContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const UserRightInfoContainer = styled.div`
  display: flex;
  flex: 1;
`;

export const UserProfileImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;
export const UserProfileDescriptionWrapper = styled.div`
  display: flex;
  margin-left: 50px;
  flex: 5;
`;

export const UserProfileImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  margin-bottom: 20px;
`;

export const UserProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BottomWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: 350px;
`;

export const UserBottomInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FeedMore = styled.p`
  font-weight: bold;
  margin-left: 12px;
  cursor: pointer;
`;

export const UserFeedInfoContainer = styled.div`
  display: flex;
`;

export const UserFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  cursor: pointer;
`;

export const UserBtnContainer = styled.div`
  position: absolute;
  right: 400px;
  bottom: 100px;
`;

export const UserInfoUl = styled.ul`
  list-style: none;
`;

export const UserInfoLi = styled.li`
  display: flex;
  height: 90px;
  font-size: 22px;
`;

export const UserInfoSpan = styled.span`
  margin-right: 50px;
  font-weight: bold;
  font-size: 25px;
`;

export const UserInfoIntro = styled.textarea`
  margin-top: 15px;
  resize: none;
  height: 300px;
  border: 1px solid rgba(204, 204, 204, 0.7);
  outline: none;
`;

export const UserInfoP = styled.p``;

export const FeedWrapper = styled.div``;

export const FeedImgContainer = styled.div`
  width: 180px;
  height: 150px;
  background-color: black;
  display: grid;
  place-items: center;
  margin-bottom: 6px;
`;

export const FeedImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const FeedTitle = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin: 0;
`;

export const InfoInput = styled.input`
  height: 40px;
  font-size: 20px;
`;
