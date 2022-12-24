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
import { useRecoilValue } from "recoil";
import axios from "axios";
// import { userIdState } from "../../store/userState";

function ChallengePage() {
  const navigate = useNavigate();
  const [clist, setClist] = useState([]);
  const [listLoad, setListLoad] = useState(false);

  const onButtonClick = (e) => {
    console.log(e.target.name, e.target.value);
  };
  const onPageButton = (e) => {
    e.preventDefault();
    navigate("/challenge_write");
  };
  useEffect(() => {
    setListLoad(false);
    axios
      .get("http://localhost:8000/challenges")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setClist(data);
      });
  }, []);
  useEffect(() => {
    if (clist) {
      console.log(clist);
      setListLoad(true);
    }
  }, [clist]);
  return (
    <Ch.ChallengePageBox>
      <Ch.ChallengefilterBox>
        <Ch.ChallengeLevelBox>
          <Ch.ChallengeMenu>난이도</Ch.ChallengeMenu>
          <Button level3 onClick={onButtonClick} name="level3" value="상">
            상
          </Button>
          <Button level2>중</Button>
          <Button level1>하</Button>
        </Ch.ChallengeLevelBox>
        <Ch.ChallengeConditionBox>
          <Ch.ChallengeMenu>참여 조건</Ch.ChallengeMenu>
          <Ch.ChallengeRankingBox>
            <Ch.RankingImage src={rank1} />
            <Ch.RankingImage src={rank2} />
            <Ch.RankingImage src={rank3} />
            <Ch.RankingImage src={rank4} />
            <Ch.RankingImage src={rank5} />
            <Ch.RankingImage src={rank6} />
          </Ch.ChallengeRankingBox>
        </Ch.ChallengeConditionBox>
        <Ch.ChallengeRegionBox>
          <Ch.ChallengeMenu>지역</Ch.ChallengeMenu>
          <Ch.ChanllengeRegionSelect>
            <option>경기도</option>
            <option>충청도</option>
            <option>전라도</option>
            <option>경상도</option>
            <option>강원도</option>
            <option>평안도</option>
            <option>함경도</option>
            <option>황해도</option>
          </Ch.ChanllengeRegionSelect>
        </Ch.ChallengeRegionBox>
      </Ch.ChallengefilterBox>
      <Ch.ChallengeListContainer>
        {clist.map((chall) => (
          <Challenge data={chall} />
        ))}
      </Ch.ChallengeListContainer>
      <Ch.addButton onClick={onPageButton}>+</Ch.addButton>
    </Ch.ChallengePageBox>
  );
}

export default ChallengePage;
