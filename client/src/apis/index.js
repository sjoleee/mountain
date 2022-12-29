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
