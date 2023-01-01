import styled from "styled-components";

export const Profile = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow: hidden;
  margin-right: 3px;
  border: 1px solid #b1a1a169;
  border-radius: 10rem;
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
