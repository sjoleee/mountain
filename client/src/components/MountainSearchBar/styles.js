import styled from "styled-components";

export const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  top: 20px;
  left: 10px;
  z-index: 40;
  width: 200px;
  height: 40px;
  border-radius: 20px;
  background-color: white;

  .input-search-mntn {
    position: absolute;
    left: 15px;
    border: none;
    background-color: transparent;
  }
  .input-search-mntn:focus {
    outline: none;
  }

  .btn-search-mntn {
    position: absolute;
    right: 5px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    img {
      width: 15px;
    }
  }
`;
