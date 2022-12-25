import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Ch from "./styles";
import Button from "../../components/common/Button.jsx";
import rank1 from "@/assets/ranking/ranking1.png";
import rank2 from "@/assets/ranking/ranking2.png";
import rank3 from "@/assets/ranking/ranking3.png";
import rank4 from "@/assets/ranking/ranking4.png";
import rank5 from "@/assets/ranking/ranking5.png";
import rank6 from "@/assets/ranking/ranking6.png";
import Challenge from "@/components/challenge";
import { useRecoilState } from "recoil";
import { userIdState } from "@/store/userState";
import axios from "axios";
// import { userIdState } from "../../store/userState";

function ChallengePage() {
  const navigate = useNavigate();
  const [clist, setClist] = useState([]);
  const [listLoad, setListLoad] = useState(false);
  const [user, setUser] = useRecoilState(userIdState);
  const onButtonClick = (e) => {
    console.log(e.target.name, e.target.value);
  };
  const onPageButton = (e) => {
    e.preventDefault();
    navigate("/challenge_write");
  };

  const onLogoutButton = (e) => {
    e.preventDefault();
    setUser("");
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  useEffect(() => {
    setListLoad(false);
    axios
      .get("http://localhost:8000/challenges?order=desc&page=1&take=20")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        console.log(data);
        setClist(data.data);
      });
  }, []);
  useEffect(() => {
    if (clist) {
      //console.log(clist);
      setListLoad(true);
    }
  }, [clist]);
  return (
    <Ch.ChallengePageBox>
      <Ch.ChallengefilterBox>
        <Ch.RegionBox>
          <Ch.FilterTitleBox>지역별 산행</Ch.FilterTitleBox>
          <Ch.FilterContentBox>
            <Ch.FilterContents>
              <Ch.FilterContent>
                <Ch.FilterText>경기도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>경상북도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>경상남도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>전라북도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>전라남도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>충청북도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>충청남도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>강원도</Ch.FilterText>
              </Ch.FilterContent>
              <Ch.FilterContent>
                <Ch.FilterText>제주도</Ch.FilterText>
              </Ch.FilterContent>
            </Ch.FilterContents>
          </Ch.FilterContentBox>
        </Ch.RegionBox>
        <Ch.LevelBox>
          <Ch.FilterTitleBox>난이도별 산행</Ch.FilterTitleBox>
          <Ch.FilterContentBox>
            <Ch.FilterTierContents>
              <Ch.TierContent></Ch.TierContent>
              <Ch.TierContent></Ch.TierContent>
              <Ch.TierContent></Ch.TierContent>
              <Ch.TierContent></Ch.TierContent>
              <Ch.TierContent></Ch.TierContent>
              <Ch.TierContent></Ch.TierContent>
            </Ch.FilterTierContents>
          </Ch.FilterContentBox>
        </Ch.LevelBox>
        <Ch.TierBox>
          <Ch.FilterTitleBox>계급별 산행</Ch.FilterTitleBox>
        </Ch.TierBox>
      </Ch.ChallengefilterBox>
      <Ch.ChallengeListContainer>
        {clist.map((chall) => (
          <Challenge data={chall} />
        ))}
      </Ch.ChallengeListContainer>
      <Ch.addButton onClick={onPageButton}>
        <Ch.addLogoSpan>+</Ch.addLogoSpan>
      </Ch.addButton>
      {user !== "" ? (
        <Ch.logoutButton onClick={onLogoutButton}>로그아웃</Ch.logoutButton>
      ) : null}
    </Ch.ChallengePageBox>
  );
}

export default ChallengePage;
