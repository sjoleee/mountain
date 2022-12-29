import styled from "styled-components";

export const RankerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;

  .point {
    font-weight: 500;
    font-size: 40px;
  }
  .meta {
    display: flex;
    align-items: center;
  }
  .name {
    font-size: 20px;
    margin: 10px;
    font-weight: 500;
  }
  ${(props) => props.style}
`;
export const ProfileBox = styled.div`
  overflow: hidden;
  margin-right: 3px;
  border: 1px solid #b1a1a169;
  border-radius: 50%;
  display: inline-block;
  width: 250px;
  height: 250px;
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const BadgeBox = styled.div`
  width: 50px;
  height: 80px;
  margin: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`;
