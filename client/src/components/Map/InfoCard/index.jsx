import React from "react";
import * as S from "@components/Map/InfoCard/styles";
import closeIcon from "@assets/close_Icon.png";

const InfoCard = ({
  selectedMountain: { mntiname, mntihigh, mntiadd },
  handleInfoCardClose,
}) => {
  return (
    <S.InfoCardLayout>
      <S.HeaderLayout>
        <S.HeaderInfoBox>
          <span className="name">{mntiname}</span>
          {mntihigh && <span className="high">{mntihigh}m</span>}
        </S.HeaderInfoBox>
        <S.CloseButtonBox>
          <button className="btn-close-overlay" onClick={handleInfoCardClose}>
            <img src={closeIcon} />
          </button>
        </S.CloseButtonBox>
      </S.HeaderLayout>
      <S.BodyBox>
        <span className="location">{mntiadd}</span>
      </S.BodyBox>
    </S.InfoCardLayout>
  );
};

export default InfoCard;
