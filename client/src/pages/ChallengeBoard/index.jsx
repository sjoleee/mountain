import React, { useEffect, useState } from "react";
import * as cp from "./styles";
import Button from "@/components/common/Button";
import CmCard from "../../components/Cmcard";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIdState } from "@/store/userState";
import { waitingListState } from "@/store/waitingList";
import { peopleListState } from "@/store/peopleList";
import axios from "axios";
import ChallModal from "@/components/challmodal";
import Back from "@/assets/challenge/previous.png";

function ChallengeBoardPage() {
  const { challengeId } = useParams();
  const [form, setForm] = useState({});
  const [leader, setLeader] = useState({});
  // 챌린지 주최자인지 확인하는 상태 변수
  const [isOrganizer, setIsOrganizer] = useState(false);
  // 챌린지 신청자 모달
  const [isModal, setIsModal] = useState(false);
  const [isData, setIsData] = useState(false);
  const [isWait, setIsWait] = useState(false);
  // 로그인한 유저를 확인하는 전역 상태변수
  const user = useRecoilValue(userIdState);
  const [wlist, setWlist] = useRecoilState(waitingListState);
  const [plist, setPlist] = useRecoilState(peopleListState);
  const navigate = useNavigate();
  useEffect(() => {
    // async function axiosForm() {
    //   const response = await axios.get(
    //     `http://localhost:8000/challenges/${challengeId}`
    //   );
    //   setForm(response.data);
    // }
    // axiosForm();
    axios
      .get(`http://localhost:8000/challenges/${challengeId}`)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setForm(data);
        setWlist(data.waitingList);
        setPlist(data.peopleList);
        return data.organizer;
      })
      .then((organizer) => {
        console.log(organizer["_id"]);
        setLeader(organizer);
        if (organizer["_id"] === user) {
          setIsOrganizer(true);
        }
        return;
      });
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);
  useEffect(() => {
    console.log(plist);
  }, [plist]);
  useEffect(() => {
    console.log(isOrganizer);
  }, [isOrganizer]);
  useEffect(() => {
    setIsData(true);
  }, [leader]);
  const onPartyButton = () => {
    setIsModal(true);
  };
  const onCloseParty = () => {
    setIsModal(false);
  };

  const onSignButton = async () => {
    console.log(localStorage.getItem("access_token"));
    await axios
      .put(
        `http://localhost:8000/challenges/${challengeId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("신청되었습니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  const onBackClick = () => {
    setWlist([]);
    setPlist([]);
    navigate(-1);
  };

  return (
    <>
      <cp.BoardContainer>
        <cp.BackImg src={Back} onClick={onBackClick} />
        <cp.CBContainer>
          <cp.CBFirst>
            <cp.CBTitleContainer>
              <cp.CBLabel>{form.name}</cp.CBLabel>
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
                  <cp.CBInfocontent>
                    {String(form.startDate).substring(0, 10)}
                  </cp.CBInfocontent>
                </cp.CBInfoLine>
                <cp.CBInfoLine>
                  <cp.CBInfotitle>
                    <cp.CBInfoh3>마감 시간</cp.CBInfoh3>
                  </cp.CBInfotitle>
                  <cp.CBInfocontent>
                    {String(form.dueDate).substring(0, 10)}
                  </cp.CBInfocontent>
                </cp.CBInfoLine>
                <cp.CBInfoLine>
                  <cp.CBInfotitle>
                    <cp.CBInfoh3>최대 인원</cp.CBInfoh3>
                  </cp.CBInfotitle>
                  <cp.CBInfocontent>{form.MaximumPeople}명</cp.CBInfocontent>
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
              <cp.CBMember>{<CmCard data={leader}></CmCard>}</cp.CBMember>
            </cp.CBLeaderContainer>
            <cp.CBMemberContainer>
              <cp.CBMemberTitle>
                <cp.CBMembersub>- 멤버</cp.CBMembersub>
              </cp.CBMemberTitle>
              <cp.CBMember>
                {plist?.map((value) => {
                  return <CmCard data={value} />;
                })}
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
            ) : (
              <cp.ButtonContainer>
                <Button onClick={onSignButton}>신청</Button>
              </cp.ButtonContainer>
            )}
            <cp.CBMargin />
            <cp.CBTitleContainer>
              <cp.miniCBLabel>참여 조건</cp.miniCBLabel>
            </cp.CBTitleContainer>
            <cp.LevelContainer>
              <cp.CBInfoLine>
                <cp.CBInfotitle>
                  <cp.CBLevelspan>난이도</cp.CBLevelspan>
                </cp.CBInfotitle>
                <cp.CBInfocontent2>
                  {form.level === "상" ? (
                    <Button level3>상</Button>
                  ) : form.level === "중" ? (
                    <Button level2>중</Button>
                  ) : (
                    <Button level>하</Button>
                  )}
                </cp.CBInfocontent2>
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
                <cp.CBInfocontent2>#북한산</cp.CBInfocontent2>
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
      {/* {isModal ? <ChallModal onCloseParty={onCloseParty}></ChallModal> : null} */}
      {isModal ? (
        <ChallModal id={form["_id"]} onCloseParty={onCloseParty}></ChallModal>
      ) : null}
    </>
  );
}

export default ChallengeBoardPage;
