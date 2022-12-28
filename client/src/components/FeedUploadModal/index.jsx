import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import FeedInput from "./feedInput";
import { RecoilRoot } from "recoil";
import useGeolocation from "@/hooks/useGeolocation";

import * as S from "./styles";
import Upload from "@/assets/upload.svg";

export const Portal = ({ children }) => {
  const $modal = document.getElementById("modal");
  return ReactDOM.createPortal(children, $modal);
};
let tmpId = 24;

const FeedModal = ({ onClick, getData, setFeeds }) => {
  const { isLoading, error, currentPosition, getPosition } = useGeolocation(
    {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity,
    },
    (coor) => console.log(coor)
  );
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
      console.log(imgUrl);
      console.log(imageFile[0]);
      setImgURL({
        file: imageFile[0],
        thumbnail: imgUrl,
        type: imageFile[0].type,
      });
      setIsImg(true);
      // let formData = new FormData();
      // formData.append("api_key", "618146626818528");
      // formData.append("upload_preset", "hoh2g1dm");
      // formData.append("timestamp", (Date.now() / 1000) | 0);
      // formData.append("file", imageFile[0]);

      // const config = {
      //   header: { "Content-Type": "multipart/form-data" },
      // };

      // axios
      //   .post(
      //     "https://api.cloudinary.com/v1_1/ji/image/upload",
      //     formData,
      //     config
      //   )
      //   .then((res) => {
      //     setImgURL(res.data.url);
      //     console.log(res.data.url);
      //   });
    }
  };

  const handleSubmit = (feedData) => (e) => {
    const { title, content } = feedData;
    if (imgURL.thumbnail.trim().length === 0)
      return alert("이미지를 올려주세요.");
    if (title.trim().length === 0) return alert("제목을 입력해주세요");
    if (content.trim().length === 0) return alert("내용을 입력해주세요");

    const { lat, lng } = currentPosition;
    const feedForm = {
      ...feedData,
      feedImg: imgURL.thumbnail,
      comments: [],
      lat,
      lng,
      id: tmpId,
    };
    tmpId += 1;

    axios.post("/feed-data", feedForm).then(() => {
      getData();
    });

    onClick();
  };

  return (
    <S.ModalContainer>
      <S.CloseContainer onClick={onClick} />
      <S.ModalCard>
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
