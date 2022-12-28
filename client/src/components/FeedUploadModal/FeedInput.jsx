import React, { useRef, useState } from "react";
import FeedTags from "../common/Tags";
import * as S from "./styles";

const FeedInput = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: [],
  });

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <>
      <S.TitleInputContainer>
        <S.TitleInput
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          onChange={handleChange}
        />
      </S.TitleInputContainer>
      <S.TextBoxContainer>
        <S.TextBox
          name="content"
          placeholder="내용을 입력해주세요."
          onChange={handleChange}
        />
      </S.TextBoxContainer>
      <S.TagContainer>
        <FeedTags formData={formData} setFormData={setFormData} />
      </S.TagContainer>
      <S.BtnContainer>
        <S.SubmitBtn onClick={onSubmit(formData)}>게시하기</S.SubmitBtn>
      </S.BtnContainer>
    </>
  );
};

export default FeedInput;
