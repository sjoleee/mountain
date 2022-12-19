import React from "react";
import styled from "styled-components";

const Feed = ({ id, img, content, profileImg, title, author }) => {
  return (
    <div>
      <img src="" alt={img} />
      <div>
        <p>제목: {title}</p>
        <img src="" alt={profileImg} />
        <p>아이디: {author}</p>
      </div>
    </div>
  );
};

export default Feed;
