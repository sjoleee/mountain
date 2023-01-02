import styled from "styled-components";

export const Section = styled.section`
  margin: 0px 20px;
`;

export const List = styled.div`
  ${(props) => props.style}
`;

export const InfoBox = styled.div`
  overflow: scroll;
  word-break: keep-all;
  height: 150px;
  line-height: 1.6;
`;
