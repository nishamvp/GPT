import axios from "axios";

const loginUser = async (email: String, password: String) => {
  const response = await axios.post("/user/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await response.data;
  return data;
};

const signupUser = async (name:String,email: String, password: String) => {
  const response = await axios.post("/user/signup", {name ,email, password });
  if (response.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await response.data;
  return data;
};

const checkAuthStatus = async () => {
  const response = await axios.get("/user/auth-status");
  if (response.status !== 200) {
    throw new Error("Unable to Authenticate");
  }
  const data = await response.data;
  return data;
};

const logoutUser = async () => {
  const response = await axios.post("/user/logout");
  if (response.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await response.data;
  return data;
};

const sendChatRequest = async (message: string) => {
  const response = await axios.post("/chat/new", { message });
  if (response.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await response.data;
  return data;
};

const getAllChats = async () => {
  const response = await axios.get("/chat/all-chats");
  if (response.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await response.data;
  return data;
};

const clearChats = async () => {
  const response = await axios.delete("/chat/clear-chats");
  if (response.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await response.data;
  return data;
};



export {
  loginUser,
  signupUser,
  checkAuthStatus,
  sendChatRequest,
  getAllChats,
  clearChats,
  logoutUser,
};
