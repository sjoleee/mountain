import styled from "styled-components";

export const MainPageLayout = styled.div`
  background: linear-gradient(to top, #000000, rgba(19, 19, 19, 0));
  display: block;
  position: absolute;
  top: 50;
  left: 0;
  width: 100%;
  height: 100vh;
  content: " ";
  z-index: 2;
  backface-visibility: hidden;
  opacity: 0.8;
`;

export const VideoPlayer = styled.video`
  position: absolute;
  top: 50;
  left: 0;
  width: 100%;
`;
