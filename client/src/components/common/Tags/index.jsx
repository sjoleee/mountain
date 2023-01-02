import React from "react";
import * as S from "./styles";

const Tags = ({ formData, setFormData, readOnly = false }) => {
  const handleKeyPress = (e) => {
    if (formData.tag.length === 7) {
      e.target.innerText = "";
      return alert("태그를 더이상 입력할 수 없습니다.");
    }
    if (e.key === "Enter") {
      const text = e.target.innerText.trim();
      setFormData({
        ...formData,
        tag: [...formData.tag, text],
      });
      e.target.innerText = "";
    }
  };

  const handleClick = (index) => (e) => {
    setFormData({
      ...formData,
      tag: formData.tag.filter((tag, i) => i !== index),
    });
  };

  return (
    <S.TagsContainer>
      <S.TagsDisplay>
        {formData.tag.map((tag, i) => (
          <S.TagSpan key={i} onClick={handleClick(i)}>
            #{tag}
          </S.TagSpan>
        ))}
        {!readOnly && (
          <S.TagsInput
            contentEditable
            placeholder="태그를 입력하세요"
            onKeyPress={handleKeyPress}
          ></S.TagsInput>
        )}
      </S.TagsDisplay>
    </S.TagsContainer>
  );
};

export default Tags;
