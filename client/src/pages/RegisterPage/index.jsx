import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import hikeLogo from "@/assets/hike_shoes.png";
import Button from "../../components/common/Button";
import axios from "axios";
import {
  RegisterWrapper,
  RegisterContainer,
  RegisterLogo,
  MiniLogo,
  RegisterFormBlock,
  ReFormName,
  ReFormLabel,
  ReFormStyledInput,
  ReFormSelect,
  ReFormStateLabel,
  ReFormImageContainer,
  ReFormProfile,
} from "@/pages/RegisterPage/styles.jsx";

function RegisterPage() {
  const [registerform, registerSetForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
    region: "경기도",
    gender: "남자",
    age: 0,
    image:
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
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(registerform);

    axios.post("/register", registerform).then((response) => {
      console.log(response.data);
    });
    navigate("/login");
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
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
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

    reader.onloadend = () => {
      const resultImage = reader.result;
      //setImage(resultImage);
      registerSetForm((current) => {
        let newForm = { ...current };
        newForm["image"] = resultImage;
        return newForm;
      });
    };
  };
  return (
    <>
      <RegisterWrapper>
        <RegisterContainer>
          <RegisterLogo>
            <MiniLogo src={hikeLogo} style={{ marginTop: "2px" }} />
            Mountain
          </RegisterLogo>
          <RegisterFormBlock onSubmit={onSubmit}>
            <ReFormName>계정 생성</ReFormName>
            <ReFormLabel>이메일 : </ReFormLabel>
            <ReFormStyledInput
              placeholder="test@test.com"
              type="email"
              name="email"
              value={registerform.email}
              onChange={onChangeEmail}
            />
            {isEmail === false ? (
              <ReFormStateLabel style={{ color: "#FF4A4A" }}>
                {emailMsg}
              </ReFormStateLabel>
            ) : (
              <ReFormStateLabel style={{ color: "#20C997" }}>
                {emailMsg}
              </ReFormStateLabel>
            )}

            <ReFormLabel> 비밀번호 : </ReFormLabel>
            <ReFormStyledInput
              placeholder="******"
              type="password"
              name="password"
              value={registerform.password}
              onChange={onChangePassword}
            />
            {isPassword === false ? (
              <ReFormStateLabel style={{ color: "#FF4A4A" }}>
                {passwordMsg}
              </ReFormStateLabel>
            ) : (
              <ReFormStateLabel style={{ color: "#20C997" }}>
                {passwordMsg}
              </ReFormStateLabel>
            )}
            <ReFormLabel> 비밀번호 확인 : </ReFormLabel>
            <ReFormStyledInput
              placeholder="******"
              type="password"
              name="passwordConfirm"
              value={registerform.passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
            {isPasswordConfirm === false ? (
              <ReFormStateLabel style={{ color: "#FF4A4A" }}>
                {passwordConfirmMsg}
              </ReFormStateLabel>
            ) : (
              <ReFormStateLabel style={{ color: "#20C997" }}>
                {passwordConfirmMsg}
              </ReFormStateLabel>
            )}
            <ReFormLabel> 전화번호 : </ReFormLabel>
            <ReFormStyledInput
              placeholder="010-1234-5678"
              type="text"
              name="phoneNumber"
              value={registerform.phoneNumber}
              onChange={onChange}
            />
            <ReFormLabel> 지역 : </ReFormLabel>
            <ReFormSelect
              name="region"
              value={registerform.region}
              onChange={onChange}
            >
              <option>경기도</option>
              <option>충청도</option>
              <option>전라도</option>
              <option>경상도</option>
              <option>강원도</option>
              <option>평안도</option>
              <option>함경도</option>
              <option>황해도</option>
            </ReFormSelect>
            <ReFormLabel> 성별 : </ReFormLabel>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={registerform.gender === "남자"}
                  onChange={onChange}
                  value="남자"
                />
                남자
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={registerform.gender === "여자"}
                  onChange={onChange}
                  value="여자"
                />
                여자
              </label>
            </div>
            <ReFormLabel> 나이 : </ReFormLabel>
            <ReFormStyledInput
              placeholder="00"
              type="number"
              name="age"
              value={registerform.age}
              onChange={onChange}
            />
            <ReFormLabel> 프로필 : </ReFormLabel>
            <ReFormImageContainer>
              <ReFormProfile
                src={registerform.image}
                onClick={() => {
                  fileInput.current.click();
                }}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/jpg,impge/png,image/jpeg"
                name="profile_img"
                onChange={onChangeImage}
                ref={fileInput}
              />
            </ReFormImageContainer>
            <Button fullWidth type="submit">
              Create an account
            </Button>
          </RegisterFormBlock>
        </RegisterContainer>
      </RegisterWrapper>
    </>
  );
}

export default RegisterPage;
