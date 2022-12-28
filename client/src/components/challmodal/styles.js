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

export const ModalContainer = styled.div`
  width: 800px;
  height: 400px;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  font-family: "Pretendard";
  display: flex;
  flex-direction: column;
`;

export const CancelImg = styled.img`
  width: 30px;
  height: 30px;
  left: 95%;
  top: 1%;
  position: relative;
  cursor: pointer;
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: semibold;
`;

export const MemberContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: flex-start;
  flex-wrap: no-wrap;
  overflow: auto;
`;

export const CardContainer = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const AgreeButton = styled.button`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  cursor: pointer;
`;

export const DisAgreeButton = styled.button`
  width: 100%;
  height: 20px;
  border: 1px solid black;
  cursor: pointer;
`;
