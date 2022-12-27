import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import hikeLogo from "@/assets/hike_shoes.png";
import Button from "../../components/common/Button";
import axios from "axios";
import * as ar from "@/pages/RegisterPage/styles.js";

function RegisterPage() {
  const [registerform, registerSetForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    region: "경기도",
    gender: "남성",
    age: 0,
    username: "",
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });

  const fileInput = useRef(null);
  const navigate = useNavigate();
  const [emailMsg, setEmailMsg] = useState("");
  const [isEmail, setIsEmail] = useState("false");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [isPassword, setIsPassword] = useState("false");
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState("false");
  const onChange = (e) => {
    const { name, value } = e.target;
    registerSetForm((current) => {
      let newForm = { ...current };
      newForm[name] = value;
      return newForm;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(registerform);
    const response = await axios.post("http://localhost:8000/users", {
      email: registerform.email,
      username: registerform.username,
      password: registerform.password,
      phoneNumber: registerform.phoneNumber,
      region: registerform.region,
      gender: registerform.gender,
      age: Number(registerform.age),
      profileImg: registerform.profileImg,
    });
    console.log(response);
    if (response.status === 201) {
      navigate("/login");
    } else {
      alert("회원가입에 실패했습니다.");
      return;
    }
    // axios
    //   .post("http://localhost:8000/users", {
    //     email: registerform.email,
    //     username: registerform.username,
    //     password: registerform.password,
    //     phoneNumber: registerform.phoneNumber,
    //     region: registerform.region,
    //     gender: registerform.gender,
    //     age: Number(registerform.age),
    //     profileImg: registerform.profileImg,
    //   })
    //   .then((response) => {
    //     if (response.data.status === 201) {
    //       navigate("/login");
    //     }
    //     console.log(response.data);
    //   });
  };

  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const currentEmail = e.target.value;
    registerSetForm((current) => {
      let newForm = { ...current };
      newForm["email"] = currentEmail;
      return newForm;
    });
    //console.log(registerform);
    if (!emailRegex.test(currentEmail)) {
      setEmailMsg("이메일 형식이 틀렸습니다.");
      setIsEmail(false);
    } else {
      setEmailMsg("올바릅니다.");
      setIsEmail(true);
    }
  };
  const onChangePassword = (e) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,14}$/;
    const currentPassword = e.target.value;
    registerSetForm((current) => {
      let newForm = { ...current };
      newForm["password"] = currentPassword;
      return newForm;
    });
    if (!passwordRegex.test(currentPassword)) {
      setPasswordMsg(
        "문자, 숫자, 특수문자를 포함하여 8자리 이상 13자리 이하로 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMsg("올바릅니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    registerSetForm((current) => {
      let newForm = { ...current };
      newForm["passwordConfirm"] = currentPasswordConfirm;
      return newForm;
    });
    if (registerform.password === currentPasswordConfirm) {
      setPasswordConfirmMsg("비밀번호와 동일합니다.");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMsg("비밀번호와 다릅니다. ");
      setIsPasswordConfirm(false);
    }
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
      console.log(data);
      registerSetForm((current) => {
        let newForm = { ...current };
        newForm["profileImg"] = data.url;
        return newForm;
      });
    };
  };
  return (
    <>
      <ar.RegisterWrapper>
        <ar.RegisterContainer>
          <ar.RegisterLogo>
            <ar.MiniLogo src={hikeLogo} style={{ marginTop: "2px" }} />
            Mountain
          </ar.RegisterLogo>
          <ar.RegisterFormBlock onSubmit={onSubmit}>
            <ar.ReFormName>계정 생성</ar.ReFormName>
            <ar.ReFormLabel>이메일 : </ar.ReFormLabel>
            <ar.ReFormStyledInput
              placeholder="test@test.com"
              type="email"
              name="email"
              value={registerform.email}
              onChange={onChangeEmail}
            />
            {isEmail === false ? (
              <ar.ReFormStateLabel style={{ color: "#FF4A4A" }}>
                {emailMsg}
              </ar.ReFormStateLabel>
            ) : (
              <ar.ReFormStateLabel style={{ color: "#20C997" }}>
                {emailMsg}
              </ar.ReFormStateLabel>
            )}

            <ar.ReFormLabel> 비밀번호 : </ar.ReFormLabel>
            <ar.ReFormStyledInput
              placeholder="******"
              type="password"
              name="password"
              value={registerform.password}
              onChange={onChangePassword}
            />
            {isPassword === false ? (
              <ar.ReFormStateLabel style={{ color: "#FF4A4A" }}>
                {passwordMsg}
              </ar.ReFormStateLabel>
            ) : (
              <ar.ReFormStateLabel style={{ color: "#20C997" }}>
                {passwordMsg}
              </ar.ReFormStateLabel>
            )}
            <ar.ReFormLabel> 비밀번호 확인 : </ar.ReFormLabel>
            <ar.ReFormStyledInput
              placeholder="******"
              type="password"
              name="passwordConfirm"
              value={registerform.passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            {isPasswordConfirm === false ? (
              <ar.ReFormStateLabel style={{ color: "#FF4A4A" }}>
                {passwordConfirmMsg}
              </ar.ReFormStateLabel>
            ) : (
              <ar.ReFormStateLabel style={{ color: "#20C997" }}>
                {passwordConfirmMsg}
              </ar.ReFormStateLabel>
            )}
            <ar.ReFormLabel> 유저네임 : </ar.ReFormLabel>
            <ar.ReFormStyledInput
              placeholder="김철수"
              type="text"
              name="username"
              value={registerform.username}
              onChange={onChange}
            />
            <ar.ReFormLabel> 전화번호 : </ar.ReFormLabel>
            <ar.ReFormStyledInput
              placeholder="010-1234-5678"
              type="text"
              name="phoneNumber"
              value={registerform.phoneNumber}
              onChange={onChange}
            />
            <ar.ReFormLabel> 지역 : </ar.ReFormLabel>
            <ar.ReFormSelect
              name="region"
              value={registerform.region}
              onChange={onChange}
            >
              <option>경기도</option>
              <option>강원도</option>
              <option>경상북도</option>
              <option>경상남도</option>
              <option>전라북도</option>
              <option>전라남도</option>
              <option>충청북도</option>
              <option>충청남도</option>
              <option>제주도</option>
            </ar.ReFormSelect>
            <ar.ReFormLabel> 성별 : </ar.ReFormLabel>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={registerform.gender === "남성"}
                  onChange={onChange}
                  value="남성"
                />
                남자
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={registerform.gender === "여성"}
                  onChange={onChange}
                  value="여성"
                />
                여자
              </label>
            </div>
            <ar.ReFormLabel> 나이 : </ar.ReFormLabel>
            <ar.ReFormStyledInput
              placeholder="00"
              type="number"
              name="age"
              value={registerform.age}
              onChange={onChange}
            />
            <ar.ReFormLabel> 프로필 : </ar.ReFormLabel>
            <ar.ReFormImageContainer>
              <ar.ReFormProfile
                src={registerform.profileImg}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                name="profileImg"
                onChange={onChangeImage}
                ref={fileInput}
              />
            </ar.ReFormImageContainer>
            <Button fullWidth type="submit">
              Create an account
            </Button>
          </ar.RegisterFormBlock>
        </ar.RegisterContainer>
      </ar.RegisterWrapper>
    </>
  );
}

export default RegisterPage;
