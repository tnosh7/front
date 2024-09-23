import axios from "axios";

const DOMAIN = "http://localhost:8080";

const API_DOMAIN = `${DOMAIN}/api`;

const authorization = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

const LOGIN_URL = () => `${API_DOMAIN}/auth/login`;
const SIGNUP_URL = () => `${API_DOMAIN}/auth/signup`;

export const loginRequest = async (requestBody) => {
  const result = await axios
    .post(LOGIN_URL(), requestBody)
    .then((response) => {
      const responseBody = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody = error.response.data;
      return responseBody;
    });
  return result;
};

export const signupRequest = async (requestBody) => {
  const result = await axios
    .post(SIGNUP_URL(), requestBody)
    .then((response) => {
      const responseBody = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody = error.response.data;
      return responseBody;
    });
  return result;
};