import React from "react";
import * as cm from "./styles";

function CmCard() {
  return (
    <cm.CardContainer>
      <cm.CardInfoContainer>
        <cm.CardInfoImg>
          <cm.CardImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></cm.CardImage>
        </cm.CardInfoImg>
        <cm.CardInfoContent>
          <cm.CardUser>
            <cm.Cardtier></cm.Cardtier>
            <cm.Cardname>username</cm.Cardname>
          </cm.CardUser>
          <cm.CardBadge></cm.CardBadge>
        </cm.CardInfoContent>
      </cm.CardInfoContainer>
      <cm.CardIntro>
        <cm.CardIntroText>안녕하세요</cm.CardIntroText>
      </cm.CardIntro>
    </cm.CardContainer>
  );
}

export default CmCard;
