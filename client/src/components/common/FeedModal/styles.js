import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.7);
  z-index: 15;
`;

export const CloseContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

export const ModalCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 450px;
  width: 700px;
  border-radius: 20px;
  background-color: white;
  z-index: 15;
  overflow: hidden;
`;

export const ImgContainer = styled.div`
  height: 100%;
  width: 56%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

export const EmptyImg = styled.div`
  height: 100%;
  width: 100%;
  background-color: #cacaca;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadInput = styled.input`
  display: none;
`;

export const EmptyCartImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 20%;
`;

export const EmptyCartImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const EmptyCartText = styled.span`
  margin-top: 10px;
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

  flex: 1;
`;

export const FeedInfoTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 40%;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  height: 20px;
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
`;

export const UserProfileImg = styled.img`
  height: 100%;
  width: 30px;
  margin-right: 15px;
`;

export const UserName = styled.p`
  font-size: 12px;
  flex: 1;
`;

export const ExitBtn = styled.button`
  border: none;
  outline: none;
  background: none;
  font-size: 27px;
  font-weight: bold;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const FeedTitle = styled.h2`
  font-size: 15px;
  margin-left: 20px;
  margin-top: 25px;
`;

export const FeedCommentContainer = styled.div`
  flex: 1;
`;

export const FeedCommentSubject = styled.p`
  margin-left: 20px;
  font-size: 25px;
  font-weight: bold;
`;

export const TitleInputContainer = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const TitleInput = styled.input`
  height: 50px;
  width: 75%;
  border: none;
  border-bottom: 3px solid black;
  outline: none;
  text-align: center;
  font-size: 22px;
`;

export const TextBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  padding: 20px;
`;

export const TextBox = styled.textarea`
  height: 100%;
  width: 90%;
  resize: none;
  border: none;
  background-color: rgba(128, 128, 128, 0.3);
`;

export const TagContainer = styled.div`
  display: flex;
  height: 27%;
  border-top: 1px solid black;
`;

export const TagInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  padding: 15px;
`;

export const SubmitBtn = styled.button`
  height: 25px;
  width: 100px;
  background-color: #12bd12;
  border: 1px solid gray;
  border-radius: 15px;
  font-weight: bold;
`;
