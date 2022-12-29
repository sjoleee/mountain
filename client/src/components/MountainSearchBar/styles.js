import styled from "styled-components";

export const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  z-index: 40;

  top: 60px;
  left: 10px;
  width: 200px;
  height: 40px;
  borderradius: 20px;
  backgroundcolor: white;

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
