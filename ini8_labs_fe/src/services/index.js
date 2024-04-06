import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:4000/",
});

export const getData = async () => {
  const response = await Axios.get("getUsers");
  //   console.log(response);
  return response;
};

export const addUserData = async (data) => {
  const response = await Axios.post("addUser", data);
  //   console.log(response);
  return response;
};

export const updateUserData = async (id, data) => {
  const response = await Axios.put(`updateUser/${id}`, data);
  //   console.log(response);
  return response;
};

export const deleteUserData = async (id) => {
  const response = await Axios.delete(`deleteUser/${id}`);
  //   console.log(response);
  return response;
};
