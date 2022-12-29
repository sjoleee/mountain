import styled from "styled-components";

export const MyLocationButtonBox = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 42px;
  height: 42px;
  z-index: 50;

  button {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background-color: white;
    padding: 0;
  }
  img {
    width: 70%;
    height: 70%;
    margin: auto;
  }
`;
