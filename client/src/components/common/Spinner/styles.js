import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const SpinnerOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const Spinner = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  border: 1px solid #767676;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  animation: ${rotation} 1s linear infinite;
`;
