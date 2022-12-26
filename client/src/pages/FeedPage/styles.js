import styled, { createGlobalStyle, css, keyframes } from "styled-components";

const fonts = css`
  font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
`;

const buttonAni = keyframes`
  0% {
  mask-position: 100% 0;
 }
 100% {
  mask-position: 0 0;
 }
`;

const buttonAni2 = keyframes`
   0% {
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
 }

 100% {
  -webkit-mask-position: 100% 0;
  mask-position: 100% 0;
 }
`;

export const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  /* background-color: rgb(15, 17, 31); */
`;

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.55);
  /* background-color: rgba(0, 190, 255, 0.7); */
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  z-index: 10;
`;

export const PostButtonContainer = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
  /* margin-left: auto; */
  margin-right: 15px;
  overflow: hidden;
  /* border: 1px solid #000; */
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  ${fonts}
  font-weight: 300;
  transition: 0.5s;
  letter-spacing: 1px;
  /* border-radius: 6px; */
`;
export const PostButtonSpan = styled.span`
  position: absolute;
  color: #000;
  width: 101%;
  ${fonts}
  font-weight: 300;
  position: absolute;
  font-size: 12px;
  margin-top: 11px;
  overflow: hidden;
  font-weight: bold;
  display: grid;
  place-items: center;
`;

export const PostButton = styled.button`
  width: 101%;
  height: 100%;
  ${fonts}
  font-weight: 300;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;

  background: rgba(0, 158, 145, 0.4);
  mask: url("https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png");
  mask-size: 3000% 100%;
  border: none;
  color: #fff;
  ${fonts}
  cursor: pointer;
  -webkit-animation: ${buttonAni} 0.7s steps(29) forwards;
  animation: ${buttonAni} 0.7s steps(29) forwards;

  &:hover {
    -webkit-animation: ${buttonAni2} 0.7s steps(29) forwards;
    animation: ${buttonAni2} 0.7s steps(29) forwards;
    cursor: pointer;
  }
`;

export const SearchInputWrapper = styled.div`
  width: 50%;
`;

export const SearchInput = styled.input`
  height: 50px;
  font-size: 20px;
  width: 100%;
  padding: 15px;
  border-radius: 15px;
  background-color: transparent;
  border: none;
  color: black;
  outline: none;
  font-weight: bold;
  text-align: center;

  &::placeholder {
    color: gray;
  }
`;

export const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 10px;
  grid-template-rows: masonry;
  grid-auto-rows: 1px;
  margin-top: 20px;
`;

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
    color: black;
    margin: 0;
    ${fonts}
    /* background-color: rgba(0, 90, 41,.6); */
    /* background-color: rgba(0, 99, 210,.6); */
  }
`;
