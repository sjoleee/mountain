import styled, { css } from "styled-components";

export const MapLayout = styled.div`
  ${(props) =>
    props.isLoading &&
    css`
      filter: blur(1px);
    `}
`;

export const CurrentPositionButton = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 50px;
  height: 40px;
  z-index: 2;
`;
