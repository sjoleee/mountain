import React, { useState, useEffect } from "react";
import * as Cwf from "./styles";
import Button from "../common/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChallnegeWriteForm({
  form,
  mlist,
  onChange,
  onMountainSearch,
  onClick,
  onSubmitClick,
  onHashtagKey,
  onChangeImage,
  isUpdate,
  mname,
}) {
  const [search, setSearch] = useState(mname);
  const [sm, setSm] = useState([]);
  const navigate = useNavigate();
  const onSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
    axios
      .get(
        `http://kdt-sw3-team03.elicecoding.com:5000/mountains?search=${e.target.value}`
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => setSm(data));
  };
  const onSearchClick = (e) => {
    const value = e.target.getAttribute("value");
    console.log(value);
    onMountainSearch(value);
    setSearch(e.target.getAttribute("name"));
  };

  const onUpdateClick = async (e) => {
    e.preventDefault();
    //console.log(form);
    //console.log(localStorage.getItem("access_token"));
    let lpoint = 0;
    if (form.level === "상") {
      lpoint = 5;
    } else if (form.level === "중") {
      lpoint = 3;
    } else if (form.level === "하") {
      lpoint = 1;
    }
    const challForm = {
      conditions: form.conditions,
      name: form.name,
      startDate: new Date(form.startDate),
      finishDate: new Date(form.finishDate),
      dueDate: new Date(form.dueDate),
      logo: form.logo,
      MaximumPeople: Number(form.MaximumPeople),
      mountain: form.mountain._id,
      content: form.content,
      region: form.region,
      level: form.level,
      point: lpoint,
    };
    console.log(challForm);
    // await axios
    //   .post("http://localhost:8000/challenges", challForm, {
    //     headers: {
    //       "Content-Type": `application/json`,
    //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    //     },
    //   })
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
    // navigate("/challenge");
    axios
      .put(
        `http://kdt-sw3-team03.elicecoding.com:5000/challenges/${form._id}`,
        challForm
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate(`/challenge/${form._id}`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Cwf.CwriteForm>
      <Cwf.CwriteFirst>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>챌린지 명</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormStyledInput
              placeholder="챌린지 이름을 입력하세요."
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.CwPeriodContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>챌린지 기간</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormStyledInput
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
            />
            <Cwf.CwFormStyledInput
              type="date"
              name="finishDate"
              value={form.finishDate}
              onChange={onChange}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwPeriodContainer>
        <Cwf.CwLogoContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>챌린지 로고</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <input
              type="file"
              accept="image/jpg,impge/png,image/jpeg"
              name="image"
              onChange={onChangeImage}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwLogoContainer>
        <Cwf.CwPeriodContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>모집 기간</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormStyledInput
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={onChange}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwPeriodContainer>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>최대 인원</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormStyledInput
              type="number"
              name="MaximumPeople"
              value={form.MaximumPeople}
              onChange={onChange}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>활동 산</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer2>
            <Cwf.CwFormStyledInput
              type="text"
              name="search"
              className="searchMountain"
              value={search}
              onChange={onSearchChange}
            ></Cwf.CwFormStyledInput>
            <Cwf.mountainName>
              <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
                {sm.map((value) => {
                  const { mntiname, _id } = value;
                  return (
                    <Cwf.mountainNameli
                      name={mntiname}
                      value={String(_id)}
                      onClick={onSearchClick}
                    >
                      {mntiname}
                    </Cwf.mountainNameli>
                  );
                })}
              </ul>
            </Cwf.mountainName>
          </Cwf.CwInputContinaer2>
        </Cwf.CwBasicContainer>

        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>소개 글</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormTextArea
              placeholder="내용을 입력하세요."
              name="content"
              value={form.content}
              onChange={onChange}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
      </Cwf.CwriteFirst>

      <Cwf.CwriteSecond>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>참여 지역</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormSelect
              name="region"
              value={form.region}
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
            </Cwf.CwFormSelect>
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>참여 조건</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormSelect
              name="conditions"
              value={form.conditions}
              onChange={onChange}
            >
              <option>브론즈</option>
              <option>실버</option>
              <option>골드</option>
              <option>플래티넘</option>
              <option>다이아몬드</option>
              <option>엄홍길</option>
            </Cwf.CwFormSelect>
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>난이도</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Button
              level3
              name="level"
              value="상"
              onClick={onClick}
              type="button"
            >
              상
            </Button>
            <Button
              level2
              name="level"
              value="중"
              onClick={onClick}
              type="button"
            >
              중
            </Button>
            <Button
              level1
              name="level"
              value="하"
              onClick={onClick}
              type="button"
            >
              하
            </Button>
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel>태그</Cwf.CwFormLabel>
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            <Cwf.CwFormStyledInput
              type="text"
              name="tag"
              value={form.tag}
              onChange={onChange}
              onKeyUp={onHashtagKey}
            />
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.CwBasicContainer>
          <Cwf.CwLabelContainer>
            <Cwf.CwFormLabel />
          </Cwf.CwLabelContainer>
          <Cwf.CwInputContinaer>
            {form.hashtag ? (
              <Cwf.HashtagList className="HashtagWrap">
                {form.hashtag}
              </Cwf.HashtagList>
            ) : (
              <Cwf.HashtagList className="HashtagWrap" />
            )}
          </Cwf.CwInputContinaer>
        </Cwf.CwBasicContainer>
        <Cwf.submitPosition>
          {isUpdate ? (
            <Button type="button" onClick={onUpdateClick}>
              수정하기
            </Button>
          ) : (
            <Button type="button" onClick={onSubmitClick}>
              등록하기
            </Button>
          )}
        </Cwf.submitPosition>
      </Cwf.CwriteSecond>
    </Cwf.CwriteForm>
  );
}

export default ChallnegeWriteForm;
