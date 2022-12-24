import React from "react";
import styled, { css } from "styled-components";

const ButtonStyle = css`
  border: none;
  border-radius: 4px;
  font-family: "Pretendard";
  font-size: 1.2rem;
  font-weight: semibold;
  font-display: swap;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: #20c997;
  &:hover {
    background: white;
    color: #20c997;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
      margin-top: 2rem;
      margin-bottom: 2rem;
    `}
  ${(props) =>
    props.level3 &&
    css`
      margin-right: 1rem;
      background: #199872;
    `}
  ${(props) =>
    props.level2 &&
    css`
      margin-right: 1rem;
    `}
  ${(props) =>
    props.level1 &&
    css`
      margin-right: 1rem;
      background: #91ecd1;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
