import styled from "styled-components";

export const SearchListLayout = styled.div`
  position: fixed;
  top: 150px;
  left: 20px;
  width: 300px;
  height: auto;
  background-color: white;
  z-index: 50;
  border-radius: 20px;
  opacity: 0.7;
`;

export const SearchListBox = styled.ul`
  margin: 0 10px;
  padding: 0;
`;

export const CloseButtonBox = styled.div`
  text-align: end;

  .btn-close-search-result {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 35px;
  }
  img {
    width: 12px;
    height: 12px;
  }
`;
