import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import FeedInput from "./feedInput";
import useGeolocation from "@/hooks/useGeolocation";
import PacmanLoader from "react-spinners/PacmanLoader ";

import * as S from "./styles";
import Upload from "@/assets/upload.svg";

export const Portal = ({ children }) => {
  const $modal = document.getElementById("modal");
  return ReactDOM.createPortal(children, $modal);
};

const FeedModal = ({ onClick, getData, setFeeds }) => {
  const { isLoading, error, currentPosition, getPosition } = useGeolocation(
    {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity,
    },
    (coor) => console.log(coor)
  );
  const [loadingState, setLoadingState] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [imgURL, setImgURL] = useState({
    file: {},
    thumbnail: "",
    type: "",
  });
  const [isOwner, setIsOwner] = useState(false); // 피드 수정시 필요

  const handleImgUpload = ({ target }) => {
    const imageFile = target.files;
    if (imageFile[0]) {
      const imgUrl = URL.createObjectURL(imageFile[0]);
      setImgURL({
        file: imageFile[0],
        thumbnail: imgUrl,
        type: imageFile[0].type,
      });
      setIsImg(true);
    }
  };

  const handleSubmit = (feedData) => (e) => {
    setLoadingState(true);
    const { title, content } = feedData;
    if (imgURL.thumbnail.trim().length === 0)
      return alert("이미지를 올려주세요.");
    if (title.trim().length === 0) return alert("제목을 입력해주세요");
    if (content.trim().length === 0) return alert("내용을 입력해주세요");

    let formData = new FormData();
    formData.append("api_key", "618146626818528");
    formData.append("upload_preset", "hoh2g1dm");
    formData.append("timestamp", (Date.now() / 1000) | 0);
    formData.append("file", imgURL.file);

    const config = {
      header: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("https://api.cloudinary.com/v1_1/ji/image/upload", formData, config)
      .then((res) => {
        setImgURL({
          ...imgURL,
          thumbnail: res.data.url,
        });
        const { lat, lng } = currentPosition;
        const feedForm = {
          ...feedData,
          feedImg: res.data.url,
          lat,
          lng,
        };

        axios
          .post("http://localhost:8000/feeds", feedForm, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then(() => {
            setLoadingState(false);
            getData();
            onClick();
          });
      });
  };

  return (
    <S.ModalContainer>
      <S.CloseContainer onClick={onClick} />
      <S.ModalCard>
        {loadingState && (
          <S.LoadingDisplay>
            <PacmanLoader color="#20C997" />
          </S.LoadingDisplay>
        )}
        <ImageUpload
          onChange={handleImgUpload}
          isImg={isImg}
          uploadImg={Upload}
          imgFile={imgURL}
        />
        <S.FeedInfoContainer>
          <FeedInput onSubmit={handleSubmit} />
          <S.ExitBtn onClick={onClick}>X</S.ExitBtn>
        </S.FeedInfoContainer>
      </S.ModalCard>
    </S.ModalContainer>
  );
};

export default FeedModal;
