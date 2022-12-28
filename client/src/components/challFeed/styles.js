import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CancelImg = styled.img`
  width: 30px;
  height: 30px;
  left: 73%;
  top: 23%;
  position: fixed;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  width: 800px;
  height: 400px;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  font-family: "Pretendard";
  display: flex;
  flex-direction: row;
`;

export const ModalImageBox = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContentBox = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid black;
`;

export const ModalImageLabel = styled.label`
  width: 95%;
  height: 95%;
  background: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalImage = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;

  &.loadImg {
    width: 100%;
    height: 100%;
  }
`;

export const ContentTitleBox = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export const ContentTitle = styled.div`
  margin-left: 10px;
`;

export const ContentContentBox = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid black;
`;
export const ContentContent = styled.div`
  margin: 10px;
`;

export const ContentTextarea = styled.textarea`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.3rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: none;
  width: 96%;
  height: 170px;
  outline: none;
  box-shadow: none;

  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;

export const ContentTagBox = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid black;
`;
export const ContentTagInputBox = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export const ContentButtonBox = styled.div`
  width: 100%;
  height: 60px;
  border: 1px solid black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ChallFeedInput = styled.input`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: none;
  width: 96%;
  height: 40px;
  outline: none;
  box-shadow: none;
  padding-left: 3%;
  margin-bottom: 0.5rem;

  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;

export const ChallFeedTagInput = styled.input`
  background: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: rgba(0, 0, 0, 80%);
  border: none;
  width: 96%;
  height: 30px;
  outline: none;
  box-shadow: none;
  padding-left: 3%;
  margin-bottom: 0.5rem;

  &:focus {
    background: white;
    color: black;
    font-weight: 300;
    box-shadow: 0 1px 5px rgba(32, 201, 151, 0.25);
  }
`;
export const HashtagList = styled.div`
  font-family: "Pretendard";
  font-size: 1.4rem;
  font-weight: 150;
  font-display: swap;
  color: black;
  display: flex;
`;

export const FeedButton = styled.div`
  width: auto;
  height: auto;
  margin: 3px;
`;
