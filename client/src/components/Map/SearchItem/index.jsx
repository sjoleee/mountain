import React from "react";
import * as S from "@components/Map/SearchItem/styles";

const SearchItem = ({ mntn, handleSearchItemClick }) => {
  return (
    <S.SearchItemBox>
      <div onClick={() => handleSearchItemClick(mntn)}>
        <div className="place-name">
          <span>{mntn.mntiname}</span>
        </div>
        <div className="place-address">
          <span>{mntn.mntiadd}</span>
        </div>
      </div>
    </S.SearchItemBox>
  );
};

export default SearchItem;
