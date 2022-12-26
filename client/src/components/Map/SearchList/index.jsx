import React from "react";
import * as S from "@components/Map/SearchList/styles";
import SearchItem from "@components/Map/SearchItem";
import closeIcon from "@assets/close_Icon.png";

const SearchList = ({
  isOpen,
  mntnList,
  handleSearchItemClick,
  handleSearchResultClose,
}) => {
  return (
    isOpen && (
      <S.SearchListLayout>
        <S.CloseButtonBox>
          <button
            className="btn-close-search-result"
            onClick={handleSearchResultClose}
          >
            <img src={closeIcon} />
          </button>
        </S.CloseButtonBox>
        <S.SearchListBox>
          {mntnList?.map((mntn) => (
            <SearchItem
              key={mntn.id}
              mntn={mntn}
              onClick={handleSearchItemClick}
            />
          ))}
        </S.SearchListBox>
      </S.SearchListLayout>
    )
  );
};

export default SearchList;
