import React, { useState, useEffect } from "react";
import * as CW from "./styles";
import ChallnegeWriteForm from "@/components/challwrite";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChallengeWritePage() {
  // const [token,setToken]=useState("");
  // useEffect(() => {
  //   setToken(`Bearer ${localStorage.getItem("access_token")}`)
  //   console.log(localStorage.getItem("access_token"));
  // }, []);
  const [form, setForm] = useState({
    name: "",
    startDate: new Date(), // 직점 참가하는 챌린지 시작 날짜
    finishDate: new Date(), // 직접 참가하는 챌린지 종료 날짜
    logo: "로고 url",
    dueDate: new Date(), // 챌린지 참여할 수 있는 신청 마지막 날짜 => 말씀하신 dueDate()
    MaximumPeople: 0,
    mountain: "북한산",
    content: "",
    tier: "브론즈",
    region: "경기도",
    level: "",
    hashtag: [],
    tag: "",
    image: null,
  });
  const navigate = useNavigate();
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
    let mcode = "";
    if (form.mountain === "북한산") {
      mcode = "129392932";
    }
    const url = `https://api.cloudinary.com/v1_1/dvcffh3la/image/upload/`;
    const formData = new FormData();
    formData.append("api_key", 932114331387218);
    formData.append("upload_preset", "aah1a0oh");
    formData.append("file", form.image);
    const configOfUpload = {
      header: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(url, formData, configOfUpload);
    console.log(data);
    const challForm = JSON.stringify({
      name: form.name,
      startDate: form.startDate,
      finishDate: form.finishDate,
      dueDate: form.dueDate,
      logo: data.url,
      MaximumPeople: Number(form.MaximumPeople),
      mountain: mcode,
      content: form.content,
      region: form.region,
      level: form.level,
      point: 3,
    });
    console.log(challForm);
    await axios
      .post("http://localhost:8000/challenges", challForm, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    navigate("/challenge");
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
  return (
    <CW.ChallengeWriteWrapper>
      <ChallnegeWriteForm
        form={form}
        onChange={onChange}
        onClick={onClick}
        onSubmitClick={onSubmitClick}
        onHashtagKey={onHashtagKey}
        onChangeImage={onChangeImage}
      />
    </CW.ChallengeWriteWrapper>
  );
}

export default ChallengeWritePage;
