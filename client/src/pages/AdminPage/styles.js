import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px 240px;
`;

export const TabContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Tab = styled.button`
  width: 100px;
  height: 30px;
  background-color: ${({ isSelected }) => (isSelected ? "  #20c997" : null)};
  border: hidden;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  &:disabled {
    background-color: lightGray;
  }
`;

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid gray;
  gap: 8px;
`;

export const PageController = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const Button = styled.button`
  width: 60px;
  height: 30px;
  background-color: #20c997;
  border: hidden;
  border-radius: 4px;
  &:disabled {
    background-color: lightGray;
  }
`;

export const BoardTitleContainer = styled.div`
  display: flex;
  width: 100%;

  height: 24px;
`;

export const BoardTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: ${({ isButton, isChallenges }) => {
    if (isButton && isChallenges) {
      return "100px";
    }
    if (isButton && !isChallenges) {
      return "20px";
    }
    return "250px";
  }};
  width: ${({ isTitle, isButton }) =>
    isTitle ? "100%" : isButton ? "60px" : "250px"};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: 1px solid white;
  background-color: #20c997;
  padding: 0 16px;
  white-space: nowrap;
`;
