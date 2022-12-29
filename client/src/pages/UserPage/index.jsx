import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as S from "./styles";
import Button from "@components/common/Button";
import getTierImg from "@/utils/getTierImg";
import { useNavigate } from "react-router-dom";
import ImageUpload from "@/components/FeedUploadModal/ImageUpload";
import Upload from "@/assets/upload.svg";

const UserProfile = () => {
  const { isLoading, error, currentPosition, getPosition } = useGeolocation({
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: Infinity,
  });
  const regionRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();
  const introRef = useRef();
  const [userInfo, setUserInfo] = useState({});
  const [userFeeds, setUserFeeds] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [mode, setMode] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [imgURL, setImgURL] = useState({
    file: {},
    thumbnail: "",
    type: "",
  });

  const tierImg = getTierImg(userInfo.tier);
  const navigate = useNavigate();
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const handleRedirect = (feedid) => {
    navigate(`/feeds?feed-id=${feedid}`);
  };

  const handleRedirectToFeedPage = (author) => {
    navigate(`/feeds?author=${author}`);
  };

  const handleWithdrawal = () => {
    axios.delete(
      "http://kdt-sw3-team03.elicecoding.com:5000/account/withdraw",
      header
    );
    localStorage.clear();
  };

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

  const handleSubmit = () => {
    setLoadingState(true);
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
          region: regionRef.current.value,
          age: ageRef.current.value,
          phone: phoneRef.current.value,
          intro: introRef.current.value,
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

        axios
          .put(
            `http://kdt-sw3-team03.elicecoding.com:5000/users/${userInfo._id}`,
            feedForm,
            header
          )
          .then(() => {
            setLoadingState(false);
            setMode(false);
          });
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get("http://kdt-sw3-team03.elicecoding.com:5000/account/profile", header)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      });
    axios
      .get(
        `http://kdt-sw3-team03.elicecoding.com:5000/feeds?author=${userId}&pos=false&like=false&order=desc&page=1&take=5`
      )
      .then((res) => {
        console.log(res.data.data);
        setUserFeeds(res.data.data);
      });
    axios
      .get(`http://kdt-sw3-team03.elicecoding.com:5000/users?point=true`)
      .then((res) => {
        setUserList(res.data);
      });
  }, []);

  return (
    <S.PageLayout>
      <S.UserInfoContainer>
        <S.UserProfileImgContainer>
          {!mode ? (
            <S.UserProfileImage src={userInfo.profileImg} alt="프로필 사진" />
          ) : (
            <ImageUpload
              onChange={handleImgUpload}
              isImg={isImg}
              uploadImg={Upload}
              imgFile={imgURL}
              borderNone={true}
            />
          )}
          {!mode ? (
            <Button onClick={() => setMode(true)} fullWidth="true">
              수정하기
            </Button>
          ) : (
            <Button onClick={() => setMode(false)} fullWidth="false">
              수정 완료하기
            </Button>
          )}
        </S.UserProfileImgContainer>
        <S.UserProfileDescriptionWrapper>
          <S.UserLeftInfoContainer>
            <S.UserProfileDescription>
              <S.UserInfoUl>
                <S.UserInfoLi>
                  <S.UserInfoSpan>지역</S.UserInfoSpan>
                  {!mode ? (
                    <S.UserInfoP>{userInfo.region}</S.UserInfoP>
                  ) : (
                    <S.InfoInput />
                  )}
                </S.UserInfoLi>
                <S.UserInfoLi>
                  <S.UserInfoSpan>나이</S.UserInfoSpan>
                  {!mode ? (
                    <S.UserInfoP>{userInfo.age}</S.UserInfoP>
                  ) : (
                    <S.InfoInput />
                  )}
                </S.UserInfoLi>
                <S.UserInfoLi>
                  <S.UserInfoSpan>성별</S.UserInfoSpan>
                  <S.UserInfoP>{userInfo.gender}</S.UserInfoP>
                </S.UserInfoLi>
                <S.UserInfoLi>
                  <S.UserInfoSpan>전화번호</S.UserInfoSpan>
                  {!mode ? (
                    <S.UserInfoP>{userInfo.phoneNumber}</S.UserInfoP>
                  ) : (
                    <S.InfoInput />
                  )}
                </S.UserInfoLi>
                <S.UserInfoLi style={{ flexDirection: "column" }}>
                  <S.UserInfoSpan>소개글</S.UserInfoSpan>
                  <S.UserInfoIntro
                    readOnly={!mode}
                    defaultValue={userInfo.intro}
                  ></S.UserInfoIntro>
                </S.UserInfoLi>
              </S.UserInfoUl>
            </S.UserProfileDescription>
          </S.UserLeftInfoContainer>
          <S.UserRightInfoContainer>
            <S.UserInfoUl>
              <S.UserInfoLi>
                <S.UserInfoSpan>완료한 챌린지</S.UserInfoSpan>
                <S.UserInfoP>
                  {userInfo.badgeList?.length === 0 && "없음"}
                  {userInfo.badgeList?.map((badge) => (
                    <img src={badge.img} />
                  ))}
                </S.UserInfoP>
              </S.UserInfoLi>
              <S.UserInfoLi>
                <S.UserInfoSpan>등산 랭킹</S.UserInfoSpan>
                <S.UserInfoP>
                  {userList.findIndex((user) => user._id === userInfo._id)}위
                </S.UserInfoP>
              </S.UserInfoLi>
              <S.UserInfoLi>
                <S.UserInfoSpan>티어</S.UserInfoSpan>
                <S.UserInfoP>
                  <img src={tierImg} />
                </S.UserInfoP>
              </S.UserInfoLi>
            </S.UserInfoUl>
          </S.UserRightInfoContainer>
        </S.UserProfileDescriptionWrapper>
      </S.UserInfoContainer>
      <S.BottomWrapper>
        <S.UserBottomInfoContainer>
          <S.FeedMore onClick={() => handleRedirectToFeedPage(userInfo._id)}>
            {"더보기 >"}
          </S.FeedMore>
          <S.UserFeedInfoContainer>
            {userFeeds.map((feed) => {
              return (
                <S.UserFeedContainer
                  key={feed._id}
                  onClick={() => handleRedirect(feed._id)}
                >
                  <S.FeedImgContainer>
                    <S.FeedImg src={feed.feedImg} />
                  </S.FeedImgContainer>
                  <S.FeedTitle>{feed.title}</S.FeedTitle>
                </S.UserFeedContainer>
              );
            })}
          </S.UserFeedInfoContainer>
          <S.UserBtnContainer>
            <Button delete onClick={handleWithdrawal}>
              탈퇴하기
            </Button>
          </S.UserBtnContainer>
        </S.UserBottomInfoContainer>
      </S.BottomWrapper>
    </S.PageLayout>
  );
};

export default UserProfile;
