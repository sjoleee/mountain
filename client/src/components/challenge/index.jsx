import React, { useState, useEffect } from "react";
import * as Card from "./styles";
import timer from "@/assets/challenge/timer.png";
import { Link } from "react-router-dom";

const Challenge = ({ data }) => {
  const [time, setTime] = useState("");

  setInterval(() => {
    const maxTime = new Date(data.dueDate);
    const nowTime = new Date();
    const diff = maxTime - nowTime;

    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const diffMin = Math.floor((diff / (1000 * 60)) % 60);
    const diffSec = Math.floor((diff / 1000) % 60);

    const diffText = `${diffDay}일  ${diffHour} : ${diffMin} : ${diffSec}`;
    setTime(diffText);
  }, 1000);

  return (
    <Card.ChallengeCard>
      <Card.CardWrap>
        <Card.CardImage src={data.logo} />
        <Link
          to={`/challenge/${data["_id"]}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.CardTitle>
            <h3>{data.name}</h3>
          </Card.CardTitle>
        </Link>
      </Card.CardWrap>
      <Card.CardInfoContainer>
        <Card.CardInfoWrap>
          <Card.CardSubInfoWrap>
            <div>{data.region}</div>
            <div>/{data.conditions} 이상</div>
          </Card.CardSubInfoWrap>
          <div>난이도: {data.level}</div>
        </Card.CardInfoWrap>
        <Card.CardTimer>
          <img
            src={timer}
            style={{ width: "20px", height: "20px", marginRight: "1rem" }}
          />
          <span style={{ color: "red" }}>{time}</span>
        </Card.CardTimer>
      </Card.CardInfoContainer>
    </Card.ChallengeCard>
  );
};

export default Challenge;
