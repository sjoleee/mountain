import React, { useState, useEffect, useRef } from "react";
import * as cf from "./styles";
import cancel from "@/assets/challenge/cancel.png";
import axios from "axios";
import Button from "../common/Button";

const ChallFeed = ({ id, onExitSubmission }) => {
  const [feedform, setFeedForm] = useState({
    title: "",
    content: "",
    tag: "",
    hashtag: [],
    feedImg:
      "https://res.cloudinary.com/dvcffh3la/image/upload/v1672222505/upload_pke1av.svg",
  });
  const fileInput = useRef(null);
  const [isImg, setIsImg] = useState(false);
  const onChangeImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    //console.log(e.target.files[0]);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      return;
    }

    reader.onloadend = async () => {
      setIsImg(true);
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
      console.log(data);
      setFeedForm((current) => {
        let newForm = { ...current };
        newForm["feedImg"] = data.url;
        return newForm;
      });
    };
  };

  const onFeedChange = (e) => {
    const { name, value } = e.target;
    setFeedForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
  };

  const onHashtagKey = (e) => {
    const printHashwrap = document.querySelector(".HashtagWrap");
    const printInner = document.createElement("div");
    printInner.className = "printInner";

    printInner.addEventListener("click", () => {
      printHashwrap.removeChild(printInner);
      setFeedForm(feedform.hashtag.filter((tag) => tag !== form.tag));
      console.log(feedform.hashtag);
    });
    if (e.keyCode === 13 && e.target.value.trim() !== "") {
      console.log("Enter Key 입력됨!", e.target.value);
      printInner.innerHTML = "#" + e.target.value;
      printHashwrap?.appendChild(printInner);
      setFeedForm((current) => {
        let newForm = { ...current };
        newForm["hashtag"] = [...newForm["hashtag"], feedform.tag];
        return newForm;
      });
      setFeedForm((current) => {
        let newForm = { ...current };
        newForm["tag"] = "";
        return newForm;
      });
    }
  };

  const onChallFeedSubmit = async () => {
    console.log(feedform);
    const userId = localStorage.getItem("userId");
    const dataForm = {
      title: feedform.title,
      tag: feedform.hashtag,
      feedImg: feedform.feedImg,
      content: feedform.content,
    };
    console.log(dataForm);

    await axios
      .post(
        `http://kdt-sw3-team03.elicecoding.com:5000/feeds/challenges/${id}`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          onExitSubmission();
        }
      });
  };
  useEffect(() => {
    console.log(fileInput);
  }, [fileInput]);
  return (
    <>
      <cf.Wrapper>
        <cf.ModalContainer>
          <cf.CancelImg src={cancel} onClick={onExitSubmission}></cf.CancelImg>
          <cf.ModalImageBox>
            <cf.ModalImageLabel>
              <cf.ModalImage
                src={feedform.feedImg}
                className={isImg ? "loadImg" : null}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                onChange={onChangeImage}
                ref={fileInput}
              />
            </cf.ModalImageLabel>
          </cf.ModalImageBox>
          <cf.ModalContentBox>
            <cf.ContentTitleBox>
              <cf.ContentTitle>
                <cf.ChallFeedInput
                  placeholder="제목"
                  type="text"
                  name="title"
                  value={feedform.title}
                  onChange={onFeedChange}
                />
              </cf.ContentTitle>
            </cf.ContentTitleBox>
            <cf.ContentContentBox>
              <cf.ContentContent>
                <cf.ContentTextarea
                  placeholder="내용을 입력해주세요.."
                  name="content"
                  value={feedform.content}
                  onChange={onFeedChange}
                />
              </cf.ContentContent>
            </cf.ContentContentBox>
            <cf.ContentTagBox>
              <div>{feedform.hashtag}</div>
            </cf.ContentTagBox>
            <cf.ContentTagInputBox>
              <cf.ContentTitle>
                <cf.ChallFeedTagInput
                  placeholder="태그"
                  type="text"
                  name="tag"
                  value={feedform.tag}
                  onChange={onFeedChange}
                  onKeyUp={onHashtagKey}
                />
              </cf.ContentTitle>
            </cf.ContentTagInputBox>
            <cf.ContentButtonBox>
              <cf.FeedButton>
                <Button type="button" onClick={onChallFeedSubmit}>
                  작성하기
                </Button>
              </cf.FeedButton>
            </cf.ContentButtonBox>
          </cf.ModalContentBox>
        </cf.ModalContainer>
      </cf.Wrapper>
    </>
  );
};

export default ChallFeed;
