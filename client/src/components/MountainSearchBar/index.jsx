import React from "react";
import { useState } from "react";
import * as S from "@components/MountainSearchBar/styles";
import searchIcon from "@assets/search_Icon.png";

const MountainSearchBar = ({ handleSearchSubmit }) => {
  const [query, setQuery] = useState("");

  const handleQuerySubmit = () => {
    handleSearchSubmit(query);
    setQuery("");
  };

  return (
    <S.SearchInputBox>
      <input
        className="input-search-mntn"
        type="text"
        value={query}
        placeholder="산 이름을 검색해보세요!"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn-search-mntn" onClick={handleQuerySubmit}>
        <img src={searchIcon} />
      </button>
    </S.SearchInputBox>
  );
};

export default MountainSearchBar;
