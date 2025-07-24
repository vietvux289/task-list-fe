import axios from "./axios.customize";

// Get all users
const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

// Create new user
const createUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};

// Update an user
const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
  };
  return axios.put(URL_BACKEND, data);
};

// Delete an user
const deleteUser = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};

// Upload file
const handleUploadFile = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
};

// Update user with new avatar
const updateUserAvatar = (_id, fullName, phone, avatar) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
    avatar: avatar,
  };
  return axios.put(URL_BACKEND, data);
};

// Register new user
const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};

// Login new user
const loginUserAPI = (email, password) => {
  const URL_BACKEND = "api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 1000,
  };
  return axios.post(URL_BACKEND, data);
};

// Get user
const getUserAPI = () => {
  const URL_BACKEND = "api/v1/auth/account";
  return axios.get(URL_BACKEND);
};

// Logout user
const logoutAPI = () => {
  const URL_BACKEND = "api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

// Get all books
const fetchAllBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

// Create new book
const createBookAPI = ({ mainText, author, price, quantity, category, thumbnail }) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    mainText,
    author,
    price,
    quantity,
    category,
    thumbnail
  }
  return axios.post(URL_BACKEND, data);
};


// Update new book
const updateBookAPI = ({ _id, mainText, author, price, quantity, category, thumbnail }) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id,
    mainText,
    author,
    price,
    quantity,
    category,
    thumbnail
  }
  return axios.put(URL_BACKEND, data);
};

// Delete a book
const deleteBook = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete(URL_BACKEND);
}
export {
  fetchAllUserAPI,
  createUserAPI,
  updateUserAPI,
  deleteUser,
  handleUploadFile,
  updateUserAvatar,
  registerUserAPI,
  loginUserAPI,
  getUserAPI,
  logoutAPI,
  fetchAllBookAPI,
  createBookAPI,
  updateBookAPI,
  deleteBook
};
