import axios from "axios";

export const getAdminData = async (tab, page) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8000/admin/${tab}`,
      params: { order: "desc", page: page, take: 10 },
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const deleteAdminData = async (tab, id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:8000/admin/${tab}/${id}`,
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const putChallangeData = async (id) => {
  try {
    const response = await axios({
      method: "put",
      url: `http://localhost:8000/admin/challenges/${id}/approve`,
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const searchPostsByPos = async ({ params }) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8000/mountains/search/pos`,
      headers: { contentType: "application/json" },
      params,
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const getMountainInfo = async (id) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8000/mountains/kakao/${id}`,
      headers: { contentType: "application/json" },
    });

    return response.data;
  } catch (error) {
    console.dir(error);
  }
};

export const postUserLogin = async (form) => {
  try {
    const response = await axios.post("http://localhost:8000/auth/login", form);
    return response;
  } catch (error) {
    console.dir(error);
  }
};

export const postUserRegister = async (registerform) => {
  try {
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
    return response;
  } catch (error) {
    console.dir(error);
  }
};

export const getChallengeList = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/challenges?order=desc&page=1&take=20"
    );
    return response;
  } catch (error) {
    console.dir(error);
  }
};
