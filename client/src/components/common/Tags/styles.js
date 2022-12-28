import styled from "styled-components";

export const TagsContainer = styled.div`
  display: flex;
  flex: 1;
  /* flex-direction: row; */
  flex-wrap: wrap;
  max-height: 100%;
  max-width: 100%;
  border-bottom: 1px solid gray;
`;

export const TagsDisplay = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const TagsInput = styled.div`
  display: flex;
  align-items: center;
  border: none;
  resize: none;
  outline: none;
  font-size: 14px;
  font-weight: bold;
  margin: 10px;
  flex: 1;
  &:empty::before {
    content: attr(placeholder);
    color: rgba(128, 128, 128, 0.4);
  }
`;

export const TagSpan = styled.span`
  display: inline-block;
  display: grid;
  place-items: center;
  margin: 10px;
  cursor: pointer;
`;
