import React, { useState } from "react";
import * as cm from "./styles";
import bronze from "@/assets/ranking/ranking1.png";
import silver from "@/assets/ranking/ranking2.png";
import diamond from "@/assets/ranking/ranking3.png";
import platinum from "@/assets/ranking/ranking4.png";
import gold from "@/assets/ranking/ranking5.png";
import umm from "@/assets/ranking/ranking6.png";

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
              <cm.Cardtier>
                {data.tier === "브론즈" ? (
                  <img style={{ width: "15px", height: "15px" }} src={bronze} />
                ) : null}
                {data.tier === "실버" ? (
                  <img style={{ width: "15px", height: "15px" }} src={silver} />
                ) : null}
                {data.tier === "골드" ? (
                  <img style={{ width: "15px", height: "15px" }} src={gold} />
                ) : null}
                {data.tier === "플래티넘" ? (
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={platinum}
                  />
                ) : null}
                {data.tier === "다이아" ? (
                  <img
                    style={{ width: "15px", height: "15px" }}
                    src={diamond}
                  />
                ) : null}
                {data.tier === "엄홍길" ? (
                  <img style={{ width: "15px", height: "15px" }} src={umm} />
                ) : null}
              </cm.Cardtier>
              <cm.Cardname>{data.username}</cm.Cardname>
            </cm.CardUser>
            <cm.CardBadge>
              {data.badgeList &&
                data.badgeList.map((value) => {
                  return (
                    <img
                      style={{ width: "23px", height: "23px" }}
                      src={value.img}
                    ></img>
                  );
                })}
            </cm.CardBadge>
          </cm.CardInfoContent>
        </cm.CardInfoContainer>
        <cm.CardIntro>
          <cm.CardIntroText>
            {data.intro ? data.intro : "안녕하세요"}
          </cm.CardIntroText>
        </cm.CardIntro>
      </cm.CardContainer>
    );
  } else {
    return;
  }
}

export default CmCard;
