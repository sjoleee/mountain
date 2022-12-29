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

export const ImgContainer = styled.div`
  height: 100%;
  width: 56%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

export const FeedImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

export const FeedInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 12px;
  flex: 1;
`;

export const FeedInfoTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

export const UserProfileImg = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  border-radius: 30px;
`;

export const UserName = styled.p`
  height: 100%;
  font-size: 14px;
  display: flex;
  align-items: center;
  flex: 1;
  font-weight: bold;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const FeedContent = styled.h2`
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 25px;
  margin-bottom: 50px;
  flex: 1;
`;

export const TagsDisplay = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex: 1;
`;

export const TagSpan = styled.span`
  display: inline-block;
  display: grid;
  place-items: center;
  margin: 12px;
  color: blue;
  cursor: pointer;
`;

export const FeedCommentContainer = styled.div`
  flex: 1;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FeedCommentSubject = styled.div`
  margin-left: 20px;
  font-size: 14px;
  /* font-weight: bold; */
`;
export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`;

export const UserIdSpan = styled.span`
  font-weight: bold;
  margin-right: 10px;
  font-size: 13px;
`;

export const CommentInputWrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
`;

export const CommentInputForm = styled.form`
  display: flex;
  height: 100%;
  width: 85%;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(82, 82, 82, 0.217);
`;

export const CommentInput = styled.input`
  flex: 3;
  border: none;
  outline: none;
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

export const CommentInputBtn = styled.button`
  flex: 1;
  border: none;
  border-left: 1px solid rgba(82, 82, 82, 0.217);
  font-weight: bold;
  transition: background-color 500ms;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`;

export const LikesWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 5px;
  bottom: 15px;
`;

export const LikesBtn = styled.button`
  position: relative;
  text-align: center;
  width: 30px;
  height: 30px;
  font-size: 30px;
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  margin-right: 10px;
`;

export const LikesCount = styled.span`
  color: red;
`;

export const MoreBtnWrapper = styled.div`
  position: absolute;
  font-size: 25px;
  right: 20px;
  top: 40px;
  cursor: pointer;
`;

export const BtnsWrapper = styled.div`
  display: flex;
  position: absolute;
`;

export const DropdownWrapper = styled.ul`
  display: grid;
  place-items: center;
  flex-direction: column;
  position: absolute;
  list-style: none;
  height: 50px;
  /* background-color: white */
  padding-left: 0;
  margin: 0;
`;

export const ButtonWrapper = styled.li`
  display: grid;
  place-items: center;
  width: 90px;
  height: 30px;
`;
