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

export const BadgeBox = styled.div`
  width: 50px;
  height: 80px;
  margin: 3px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const TierBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px;

  img {
    width: 40px;
    height: 40px;
  }
`;
