import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import FeedInput from "./FeedInput";
import useGeolocation from "@/hooks/useGeolocation";
import PacmanLoader from "react-spinners/PacmanLoader ";

import * as S from "./styles";
import Upload from "@/assets/upload.svg";

export const Portal = ({ children }) => {
  const $modal = document.getElementById("modal");
  return ReactDOM.createPortal(children, $modal);
};

const FeedModal = ({ onClick, getData, setFeeds, modifyMode, feedEach }) => {
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
        const header = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        };
        if (modifyMode) {
          axios
            .put(
              `http://kdt-sw3-team03.elicecoding.com:5000/feeds`,
              feedForm,
              header
            )
            .then(() => {
              setLoadingState(false);
              getData();
              onClick();
            });
          return;
        }

        axios
          .post(
            "http://kdt-sw3-team03.elicecoding.com:5000/feeds",
            feedForm,
            header
          )
          .then(() => {
            setLoadingState(false);
            getData();
            onClick();
          });
      });
  };

  useEffect(() => {
    if (modifyMode) {
      setImgURL({
        ...imgURL,
        thumbnail: feedEach.feedImg,
      });
      setIsImg(true);
    }
  }, []);

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
          <FeedInput
            onSubmit={handleSubmit}
            feedEach={feedEach}
            modifyMode={modifyMode}
          />
          <S.ExitBtn onClick={onClick}>X</S.ExitBtn>
        </S.FeedInfoContainer>
      </S.ModalCard>
    </S.ModalContainer>
  );
};

export default FeedModal;
