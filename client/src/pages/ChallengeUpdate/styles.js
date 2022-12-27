import styled from "styled-components";

export const ChallengeUpdateWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackImg = styled.img`
  width: 30px;
  height: 30px;
  position: fixed;
  top: 20px;
  left: 20px;
  transition: 0.7s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    top: 18px;
  }
`;
