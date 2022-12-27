import React, { useRef } from "react";
import * as S from "./styles";

const ImageUpload = ({ onChange, isImg, uploadImg, imgFile }) => {
  const inputRef = useRef();

  const handleInputClick = (e) => {
    inputRef.current?.click();
  };

  return (
    <>
      <S.ImgContainer onClick={handleInputClick}>
        <S.UploadInput
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
        {isImg ? (
          <S.FeedImg src={imgFile.thumbnail} alt="피드 이미지" />
        ) : (
          <S.EmptyImg>
            <S.EmptyCartImgContainer>
              <S.EmptyCartImg src={uploadImg} />
              <S.EmptyCartText>사진을 업로드하세요.</S.EmptyCartText>
            </S.EmptyCartImgContainer>
          </S.EmptyImg>
        )}
      </S.ImgContainer>
    </>
  );
};

export default ImageUpload;
