import styled, { keyframes } from "styled-components";

const showRightToLeft = keyframes`
    from {
        transform: translateX(410px);
    }
    to {
        transform: translateX(0px);
    }
`;

export const SideBarLayout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100%;
  z-index: 50;
  display: flex;
  flex-direction: columns;
  align-items: center;
  animation: ${showRightToLeft} 0.3s;
`;

export const SideBarBox = styled.div`
  height: 95%;
  width: 100%;
  background-color: white;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  flex-direction: column;
`;
