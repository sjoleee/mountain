import styled from "styled-components";

export const InnerContainer = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;

  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const SubTextContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;

  font-size: 11px;
  font-weight: 300;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const LeftButton = styled.button`
  width: 126px;
  height: 44px;
  border: hidden;
  border-radius: 7px;
`;

export const RightButton = styled.button`
  width: 126px;
  height: 44px;
  border: hidden;
  border-radius: 7px;
  background-color: #20c997;
`;

export const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props?.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

export const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

export const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  width: 312px;
  max-height: 300px;
  padding: 16px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  border: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 1);
`;
