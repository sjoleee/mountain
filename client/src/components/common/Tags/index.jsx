import React, { useRef, useState } from "react";
import * as S from "./styles";

const Tags = ({ formData, setFormData, readOnly = false }) => {
  const id = useRef(1);

  const handleKeyPress = (e) => {
    if (formData.tag.length === 7) {
      e.target.innerText = "";
      return alert("태그를 더이상 입력할 수 없습니다.");
    }
    if (e.key === "Enter") {
      console.log("sadf");
      setFormData({
        ...formData,
        tag: [...formData.tag, { id: id.current, tag: e.target.innerText }],
      });
      id.current += 1;
      e.target.innerText = "";
    }
  };

  const handleClick = (id) => (e) => {
    setFormData({
      ...formData,
      tag: formData.tag.filter((tag) => tag.id !== id),
    });
  };

  return (
    <S.TagsContainer>
      <S.TagsDisplay>
        {formData.tag.map(({ id, tag }) => (
          <S.TagSpan key={id} onClick={handleClick(id)}>
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
