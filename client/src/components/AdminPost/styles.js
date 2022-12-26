import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 4px;
  border: 1px solid lightGray;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ isTitle }) => (isTitle ? "100%" : "250px")};
  border-left: ${({ isTitle }) => (isTitle ? "1px solid lightGray" : null)};
  border-right: ${({ isTitle }) => (isTitle ? "1px solid lightGray" : null)};
  padding: 0 16px;
  white-space: nowrap;
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

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 4px;
`;
