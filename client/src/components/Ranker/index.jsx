import React from "react";
import * as S from "@components/Ranker/styles";
import getTierImg from "../../utils/getTierImg";

const Ranker = ({
  ranker: { profileImg, username, badgeList, tier, point },
  style,
}) => (
  <S.RankerBox style={style}>
    <span className="point">{point}</span>
    <span>points</span>

    <S.ProfileBox>
      <img src={profileImg} />
    </S.ProfileBox>

    <span className="name">{username}</span>

    <div className="meta">
      {badgeList?.map(({ _id, img }) => (
        <S.BadgeBox key={_id}>
          <img src={img} />
        </S.BadgeBox>
      ))}
      <S.TierBox>
        <img src={getTierImg(tier)} />
        <span className="tier-name">{tier}</span>
      </S.TierBox>
    </div>
  </S.RankerBox>
);

export default Ranker;
