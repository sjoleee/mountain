import React, { useEffect, useState } from "react";
import * as cm from "./styles";
import cancel from "@/assets/challenge/cancel.png";
import CmCard from "../challengeMember";
import axios from "axios";
import { useRecoilState } from "recoil";
import { waitingListState } from "@/store/waitingList";
import { peopleListState } from "@/store/peopleList";

function ChallModal({ onCloseParty, id }) {
  const [wlist, setWlist] = useRecoilState(waitingListState);
  const [plist, setPlist] = useRecoilState(peopleListState);
  useEffect(() => {
    console.log(wlist);
  }, [wlist]);
  const onRefuseButton = async () => {
    const windex = Number(document.querySelector(".windex").value);
    console.log(windex);
    await axios
      .put(
        `http://localhost:8000/challenges/${id}/users/${wlist[windex]["_id"]}/refuse`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("제거되었습니다.");
          let newWlist = wlist.filter((value, index) => index !== windex);
          setWlist(newWlist);
          return;
        }
      })
      .catch((err) => console.log(err));
  };
  const onAcceptButton = async () => {
    const windex = Number(document.querySelector(".windex").value);
    console.log(windex);
    await axios
      .put(
        `http://localhost:8000/challenges/${id}/users/${wlist[windex]["_id"]}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("추가되었습니다.");
          let newWlist = wlist.filter((value, index) => index !== windex);
          setPlist(() => {
            let newPlist = [...plist];
            newPlist.push(wlist[windex]);
            return newPlist;
          });
          setWlist(newWlist);

          return;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <cm.Wrapper>
      <cm.ModalContainer>
        <cm.CancelImg src={cancel} onClick={onCloseParty}></cm.CancelImg>
        <cm.TitleContainer>
          <cm.Title>챌린지 신청자 목록</cm.Title>
        </cm.TitleContainer>
        <cm.MemberContainer>
          {wlist.map((value, index) => {
            return (
              <cm.CardContainer>
                <CmCard data={value} />
                <cm.ButtonContainer>
                  <cm.AgreeButton onClick={onAcceptButton}>
                    수락하기
                  </cm.AgreeButton>
                  <cm.DisAgreeButton onClick={onRefuseButton}>
                    거절하기
                  </cm.DisAgreeButton>
                </cm.ButtonContainer>
                <input type="hidden" value={index} className="windex" />
              </cm.CardContainer>
            );
          })}
        </cm.MemberContainer>
      </cm.ModalContainer>
    </cm.Wrapper>
  );
}

export default ChallModal;
