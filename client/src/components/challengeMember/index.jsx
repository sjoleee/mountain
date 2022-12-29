import React from "react";
import * as cm from "./styles";

function CmCard({ data }) {
  if (data) {
    return (
      <cm.CardContainer>
        <cm.CardInfoContainer>
          <cm.CardInfoImg>
            <cm.CardImage src={data.profileImg}></cm.CardImage>
          </cm.CardInfoImg>
          <cm.CardInfoContent>
            <cm.CardUser>
              <cm.Cardtier></cm.Cardtier>
              <cm.Cardname>{data.username}</cm.Cardname>
            </cm.CardUser>
            <cm.CardBadge>{data.badgeList}</cm.CardBadge>
          </cm.CardInfoContent>
        </cm.CardInfoContainer>
        <cm.CardIntro>
          <cm.CardIntroText>{data.intro}</cm.CardIntroText>
        </cm.CardIntro>
      </cm.CardContainer>
    );
  } else {
    return;
  }
}

export default CmCard;
