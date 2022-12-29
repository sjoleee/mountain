import styled from "styled-components";

export const SearchItemBox = styled.li`
  height: 50px;
  list-style: none;
  border-bottom: 1px solid #aea9a973;
  padding: 20px 0;
  cursor: pointer;

  .place-name {
    font-weight: 700;
    margin-bottom: 10px;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }
`;
