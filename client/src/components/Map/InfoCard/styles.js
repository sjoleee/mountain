import styled from "styled-components";

export const InfoCardLayout = styled.div`
  width: 230px;
  height: 50px;
  padding: 15px 23px;
  background-color: white;
  border-radius: 60px;
  box-shadow: 4px 4px 4px lightgray;
  margin-bottom: 2px;
  font-size: 13px;

  &:after {
    content: "";
    position: absolute;
    bottom: 3px;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: white;
    border-bottom: 0;
    border-left: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

export const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HeaderInfoBox = styled.div`
  white-space: normal;

  .name {
    font-size: 16px;
    font-weight: 600;
    padding-right: 7px;
  }
`;

export const CloseButtonBox = styled.div`
  .btn-close-overlay {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  img {
    width: 10px;
    height: 10px;
  }
`;

export const BodyBox = styled.div`
  margin: 10px 0;
  white-space: normal;
`;
