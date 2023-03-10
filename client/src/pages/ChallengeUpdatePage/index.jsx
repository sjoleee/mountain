import React, { useState, useEffect } from "react";
import * as CU from "./styles";
import ChallnegeWriteForm from "@/components/challwrite";
import { useNavigate, useParams } from "react-router-dom";
import Back from "@/assets/challenge/previous.png";
import axios from "axios";

function ChallengeUpdatePage() {
  const [form, setForm] = useState({
    name: "",
    startDate: new Date(), // 직점 참가하는 챌린지 시작 날짜
    finishDate: new Date(), // 직접 참가하는 챌린지 종료 날짜
    logo: "로고 url",
    dueDate: new Date(), // 챌린지 참여할 수 있는 신청 마지막 날짜 => 말씀하신 dueDate()
    MaximumPeople: 0,
    mountain: "북한산",
    content: "",
    conditions: "브론즈",
    region: "경기도",
    level: "",
    hashtag: [],
    tag: "",
    image: null,
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [mname, setMname] = useState("");
  const navigate = useNavigate();
  const { challengeId } = useParams();
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
    console.log(form);
  };
  const onClick = (e) => {
    const { name, value } = e.target;
    setForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
    console.log(form);
  };
  const onSubmitClick = async (e) => {
    e.preventDefault();
    //console.log(form);
    console.log(localStorage.getItem("access_token"));

    const challForm = {
      conditions: form.conditions,
      name: form.name,
      startDate: form.startDate,
      finishDate: form.finishDate,
      dueDate: form.dueDate,
      logo: form.logo,
      MaximumPeople: Number(form.MaximumPeople),
      mountain: form.mountain._id,
      content: form.content,
      region: form.region,
      level: form.level,
      point: 3,
    };
    console.log(challForm);
    // await axios
    //   .post("http://localhost:8000/challenges", challForm, {
    //     headers: {
    //       "Content-Type": `application/json`,
    //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
    // navigate("/challenge");
  };
  const onChangeImage = (e) => {
    const reader = new FileReader();
    //console.log(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      return;
    }

    reader.onloadend = () => {
      const resultImage = reader.result;
      //setImage(resultImage);
      setForm((current) => {
        let newForm = { ...current };
        newForm["image"] = resultImage;
        return newForm;
      });
    };
  };
  const onHashtagKey = (e) => {
    const printHashwrap = document.querySelector(".HashtagWrap");
    const printInner = document.createElement("div");
    printInner.className = "printInner";

    printInner.addEventListener("click", () => {
      printHashwrap.removeChild(printInner);
      setHashArr(form.hashtag.filter((tag) => form.tag));
      console.log(form.hashtag);
    });
    if (e.keyCode === 13 && e.target.value.trim() !== "") {
      console.log("Enter Key 입력됨!", e.target.value);
      printInner.innerHTML = "#" + e.target.value;
      printHashwrap?.appendChild(printInner);
      setForm((current) => {
        let newForm = { ...current };
        newForm["hashtag"] = [...newForm["hashtag"], form.tag];
        return newForm;
      });
      setForm((current) => {
        let newForm = { ...current };
        newForm["tag"] = "";
        return newForm;
      });
    }
  };
  const onBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    axios
      .get(
        `http://kdt-sw3-team03.elicecoding.com:5000/challenges/${challengeId}`
      )
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .then((data) => {
        let newData = {
          ...data,
          startDate: String(data.startDate).substring(0, 10),
          finishDate: String(data.finishDate).substring(0, 10),
          dueDate: String(data.dueDate).substring(0, 10),
        };
        console.log(newData);
        setForm(newData);
        setMname(data.mountain.mntiname);
      });
    setIsUpdate(true);
  }, []);
  return (
    <>
      <CU.ChallengeUpdateWrapper>
        <CU.BackImg src={Back} onClick={onBackClick} />
        <ChallnegeWriteForm
          form={form}
          onChange={onChange}
          onClick={onClick}
          onSubmitClick={onSubmitClick}
          onHashtagKey={onHashtagKey}
          onChangeImage={onChangeImage}
          isUpdate={isUpdate}
          mname={mname}
        />
      </CU.ChallengeUpdateWrapper>
    </>
  );
}

export default ChallengeUpdatePage;
