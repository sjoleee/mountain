import React from "react";
import * as S from "@components/common/Spinner/styles";

const Spinner = () => {
  return (
    <S.SpinnerOverlay>
      <S.Spinner />
    </S.SpinnerOverlay>
  );
};

export default Spinner;
