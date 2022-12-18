import styled, { css } from "styled-components";

export const MapLayout = styled.div``;

export const MyLocationButton = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 50px;
  height: 40px;
  z-index: 2;
`;

export const LoadingBox = styled.div`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
`;
