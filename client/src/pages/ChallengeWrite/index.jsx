import React, { useState, useEffect } from "react";
import * as CW from "./styles";
import ChallnegeWriteForm from "@/components/challwrite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Back from "@/assets/challenge/previous.png";

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
    logo: "https://res.cloudinary.com/dvcffh3la/image/upload/v1672208924/sky-gb9262c70e_640_dvqjq9.png",
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
  const navigate = useNavigate();
  const [mlist, setMlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/mountains")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const mform = data.map((value) => {
          const { _id, mntiname } = value;
          return { _id, mntiname };
        });
        setMlist(mform);
      });
  }, []);

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
      MaximumPeople: Number(form.MaximumPeople),
      mountain: form.mountain,
      content: form.content,
      hashtag: form.hashtag,
      region: form.region,
      level: form.level,
      point: 3,
      logo: form.logo,
    };
    console.log(challForm);
    await axios
      .post("http://localhost:8000/challenges", challForm, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          navigate("/challenge");
        }
      })
      .catch((err) => console.log(err));
  };

  const onChangeImage = (e) => {
    const reader = new FileReader();
    //console.log(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      return;
    }

    reader.onloadend = async () => {
      const resultImage = reader.result;
      //setImage(resultImage);
      const url = `https://api.cloudinary.com/v1_1/dvcffh3la/image/upload/`;
      const formData = new FormData();
      formData.append("api_key", 932114331387218);
      formData.append("upload_preset", "aah1a0oh");
      formData.append("file", resultImage);
      const configOfUpload = {
        header: { "Content-Type": "multipart/form-data" },
      };
      const { data } = await axios.post(url, formData, configOfUpload);
      console.log(data.url);
      setForm((current) => {
        let newForm = { ...current };
        newForm["logo"] = data.url;
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
  const onMountainSearch = (value) => {
    setForm((current) => {
      let newForm = { ...current };
      newForm["mountain"] = value;
      return newForm;
    });
  };
  return (
    <CW.ChallengeWriteWrapper>
      <CW.BackImg src={Back} onClick={onBackClick}></CW.BackImg>
      <ChallnegeWriteForm
        form={form}
        mlist={mlist}
        onChange={onChange}
        onMountainSearch={onMountainSearch}
        onClick={onClick}
        onSubmitClick={onSubmitClick}
        onHashtagKey={onHashtagKey}
        onChangeImage={onChangeImage}
      />
    </CW.ChallengeWriteWrapper>
  );
}

export default ChallengeWritePage;
