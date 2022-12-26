import React from "react";
import * as S from "@components/Map/SearchItem/styles";

const SearchItem = ({ mntn }) => {
  return (
    <S.SearchItemBox>
      <div className="place-name">
        <span>{mntn.mntiname}</span>
      </div>
      <div className="place-address">
        <span>{mntn.mntiadd}</span>
      </div>
    </S.SearchItemBox>
  );
};

export default SearchItem;
