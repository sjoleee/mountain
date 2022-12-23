import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as S from "./styles";
import Upload from "@/assets/upload.svg";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import FeedInput from "./feedInput";

export const Portal = ({ children }) => {
  const $modal = document.getElementById("modal");
  return ReactDOM.createPortal(children, $modal);
};

const FeedModal = ({ onClick }) => {
  const [isImg, setIsImg] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [imgURL, setImgURL] = useState("");

  const handleImgUpload = ({ target }) => {
    const imageFile = target.files;
    if (imageFile[0]) {
      const imgUrl = URL.createObjectURL(imageFile[0]);
      console.log(imgUrl);
      console.log(imageFile[0]);
      setImgFile({
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
    const feedForm = {
      ...feedData,
      feedImg: imgFile.thumbnail,
    };
    axios.post("/api", feedForm);
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
          imgFile={imgFile}
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
