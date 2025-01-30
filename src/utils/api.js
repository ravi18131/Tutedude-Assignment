import axios from "axios";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || "";
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_URL + url, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const fetchAllProductData = async (url) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_URL + url, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const postData = async (url, formData) => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_API_URL + url, formData, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const editData = async (url, updatedData) => {
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_API_URL}${url}`, updatedData, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, { headers: getAuthHeaders() });
    return data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const deleteImages = async (url, image) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, {
      headers: getAuthHeaders(),
      data: image,
    });
    return data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const uploadImage = async (url, formData) => {
  try {
    const response = await axios.post(process.env.REACT_APP_API_URL + url, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Throw meaningful error message from the backend
      throw new Error(error.response.data.message || "An unexpected error occurred.");
    } else {
      // Handle network or other unexpected errors
      throw new Error("Network error. Please try again later.");
    }
  }
};

export const checkPincodeServiceability = async(url, pinCode)=>{
  try{
      const response = await axios.get(process.env.REACT_APP_API_URL+url+pinCode);
      return response.data;
  }
  catch(err){
    console.log(err)
      throw new Error("Network Error. Please try again later")
  }
}