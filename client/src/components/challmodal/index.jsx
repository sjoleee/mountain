import React from "react";
import * as cm from "./styles";
import cancel from "@/assets/challenge/cancel.png";
function ChallModal({ onCloseParty }) {
  return (
    <cm.Wrapper>
      <cm.ModalContainer>
        <cm.CancelImg src={cancel} onClick={onCloseParty}></cm.CancelImg>
        <cm.TitleContainer>
          <cm.Title>챌린지 신청자 목록</cm.Title>
        </cm.TitleContainer>
        <cm.MemberContainer>가나다라마</cm.MemberContainer>
      </cm.ModalContainer>
    </cm.Wrapper>
  );
}

export default ChallModal;
