import React, { useState, useEffect } from "react";
import { getTopRankingList } from "../../apis";
import * as S from "@pages/RankingPage/styles";
import Ranker from "@components/Ranker";

const RankingPage = () => {
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const showRankingInfo = async () => {
    const rankInfo = await getTopRankingList({ point: true });

    const [_first, _second, _third] = rankInfo;
    setFirst(_first);
    setSecond(_second);
    setThird(_third);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    showRankingInfo();
  }, []);

  if (isLoading) return;

  return (
    <S.RankinPageLayout>
      <S.RankerList>
        <Ranker ranker={second} />
        <Ranker
          ranker={first}
          style={{ position: "relative", top: " -80px" }}
        />
        <Ranker ranker={third} />
      </S.RankerList>
    </S.RankinPageLayout>
  );
};

export default RankingPage;
