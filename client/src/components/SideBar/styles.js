import styled, { keyframes } from "styled-components";

const showRightToLeft = keyframes`
    from {
        transform: translateX(410px);
    }
    to {
        transform: translateX(0px);
    }
`;

export const SideBarLayout = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100%;
  z-index: 50;
  display: flex;
  flex-direction: columns;
  align-items: center;
  animation: ${showRightToLeft} 0.3s;
`;

export const SideBarBox = styled.div`
  height: 95%;
  width: 100%;
  background-color: white;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  display: flex;
  flex-direction: column;
`;

export const InfoSection = styled.section`
  margin: 0px 20px;
`;

export const InfoBox = styled.div`
  overflow: scroll;
  word-break: keep-all;
  height: 150px;
  line-height: 1.6;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileSection = styled.section`
  margin: 0px 20px;
  flex-basis: 30%;
`;

export const ProfileList = styled.div`
  overflow: scroll;
  height: 175px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Profile = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  margin-right: 3px;
  border: 1px solid #b1a1a169;
  border-radius: 30px;
  display: inline-block;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostSection = styled.section`
  margin: 0px 20px;
`;

export const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 270px;
  gap: 2px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PostBox = styled.div`
  width: 32.9%;
  height: 120px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const EmptyContent = styled.div``;
