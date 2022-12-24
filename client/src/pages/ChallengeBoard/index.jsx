import React, { useEffect, useState } from "react";
import * as cp from "./styles";
import Button from "@/components/common/Button";
import CmCard from "../../components/Cmcard";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userIdState } from "@/store/userState";
import axios from "axios";
import ChallModal from "@/components/challmodal";

function ChallengeBoardPage() {
  const { challengeId } = useParams();
  const [form, setForm] = useState({});
  // 챌린지 주최자인지 확인하는 상태 변수
  const [isOrganizer, setIsOrganizer] = useState(false);
  // 챌린지 신청자 모달
  const [isModal, setIsModal] = useState(false);
  // 로그인한 유저를 확인하는 전역 상태변수
  const user = useRecoilValue(userIdState);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/challenges/${challengeId}`)
      .then((response) => {
        console.log(response);
        setForm(response.data);
      });
  }, []);
  useEffect(() => {
    if (form.organizer === user) {
      setIsOrganizer(true);
    }
    console.log(isOrganizer);
  }, [form]);

  const onPartyButton = () => {
    setIsModal(true);
  };
  const onCloseParty = () => {
    setIsModal(false);
  };

  return (
    <>
      <cp.BoardContainer>
        <cp.CBContainer>
          <cp.CBFirst>
            <cp.CBTitleContainer>
              <cp.CBLabel>{form.name} 챌린지</cp.CBLabel>
            </cp.CBTitleContainer>
            <cp.CBBasicContainer>
              <cp.CBImageContainer>
                <cp.CBImage src={form.logo} />
              </cp.CBImageContainer>
              <cp.CBInfoContainer>
                <cp.CBInfoLine>
                  <cp.CBInfotitle>
                    <cp.CBInfoh3>모집 기간</cp.CBInfoh3>
                  </cp.CBInfotitle>
                  <cp.CBInfocontent>{form.startDate}</cp.CBInfocontent>
                </cp.CBInfoLine>
                <cp.CBInfoLine>
                  <cp.CBInfotitle>
                    <cp.CBInfoh3>마감 시간</cp.CBInfoh3>
                  </cp.CBInfotitle>
                  <cp.CBInfocontent>{form.dueDate}</cp.CBInfocontent>
                </cp.CBInfoLine>
                <cp.CBInfoLine>
                  <cp.CBInfotitle>
                    <cp.CBInfoh3>최대 인원</cp.CBInfoh3>
                  </cp.CBInfotitle>
                  <cp.CBInfocontent>{form.MaximumPeople}</cp.CBInfocontent>
                </cp.CBInfoLine>
              </cp.CBInfoContainer>
            </cp.CBBasicContainer>
            <cp.CBTitleContainer>
              <cp.CBLabel>챌린지 멤버</cp.CBLabel>
            </cp.CBTitleContainer>
            <cp.CBLeaderContainer>
              <cp.CBMemberTitle>
                <cp.CBMembersub>- 리더</cp.CBMembersub>
              </cp.CBMemberTitle>
              <cp.CBMember>
                <CmCard />
              </cp.CBMember>
            </cp.CBLeaderContainer>
            <cp.CBMemberContainer>
              <cp.CBMemberTitle>
                <cp.CBMembersub>- 멤버</cp.CBMembersub>
              </cp.CBMemberTitle>
              <cp.CBMember>
                <CmCard />
                <CmCard />
                <CmCard />
              </cp.CBMember>
            </cp.CBMemberContainer>
          </cp.CBFirst>
          <cp.CBSecond>
            {isOrganizer ? (
              <cp.ButtonContainer>
                <Button>수정</Button>
                <Button onClick={onPartyButton}>참여</Button>
                <Button>제출</Button>
              </cp.ButtonContainer>
            ) : null}
            <cp.CBMargin />
            <cp.CBTitleContainer>
              <cp.miniCBLabel>참여 조건</cp.miniCBLabel>
            </cp.CBTitleContainer>
            <cp.LevelContainer>
              <cp.CBInfoLine>
                <cp.CBInfotitle>
                  <cp.CBLevelspan>난이도</cp.CBLevelspan>
                </cp.CBInfotitle>
                <cp.CBInfocontent>
                  {form.level === "상" ? (
                    <Button level3>상</Button>
                  ) : form.level === "중" ? (
                    <Button level2>중</Button>
                  ) : (
                    <Button level>하</Button>
                  )}
                </cp.CBInfocontent>
              </cp.CBInfoLine>
            </cp.LevelContainer>
            <cp.CBTitleContainer>
              <cp.miniCBLabel>활동 지역</cp.miniCBLabel>
            </cp.CBTitleContainer>
            <cp.LevelContainer>
              <cp.CBInfoLine>
                <cp.CBInfotitle>
                  <cp.CBLevelspan>태그</cp.CBLevelspan>
                </cp.CBInfotitle>
                <cp.CBInfocontent>#북한산</cp.CBInfocontent>
              </cp.CBInfoLine>
            </cp.LevelContainer>
            <cp.CBMargin />
            <cp.CBTitleContainer>
              <cp.CBLabel>소개글</cp.CBLabel>
            </cp.CBTitleContainer>
            <cp.CBtaContainer>
              <cp.CBTextArea
                defaultValue={form.content}
                readOnly
              ></cp.CBTextArea>
            </cp.CBtaContainer>
            <cp.CBTitleContainer>
              <cp.CBLabel>피드 (해당 챌린지)</cp.CBLabel>
            </cp.CBTitleContainer>
            <cp.CBfeedContainer></cp.CBfeedContainer>
          </cp.CBSecond>
        </cp.CBContainer>
      </cp.BoardContainer>
      {isModal ? <ChallModal onCloseParty={onCloseParty} /> : null}
    </>
  );
}

export default ChallengeBoardPage;
