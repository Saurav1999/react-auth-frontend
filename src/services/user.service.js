import axios from "axios";
import store from "../store";
import validateToken from "../utils/validateToken";


const API_URL = "http://localhost:5000";

const Axios = axios.create({
  baseURL: API_URL,
});

Axios.interceptors.request.use(
  (config) => {
    const token = store.getState().userData.token;
    const refreshToken = store.getState().userData.refreshToken;
    const tokenValidation = validateToken(token);
    const refreshTokenValidation = validateToken(refreshToken);

    if (tokenValidation.status === "EXPIRED_TOKEN") {
      if (refreshTokenValidation.status === "EXPIRED_TOKEN") {
        window.location = "http://localhost:5000/auth/login";
      } else {
        store.dispatch({ type: tokenValidation.status });
      }
    }

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

class UserService {
  async getResource() {
    console.log();
    // const headers = {
    //   Authorization:
    //     `Bearer ${token}`,
    // };
    try {
      const response = await Axios.get("/getResource");
      return response;
    } catch (err) {
      throw err;
    }
  }
  async getResource2() {
    console.log();
    // const headers = {
    //   Authorization:
    //     `Bearer ${token}`,
    // };
    try {
      const response = await Axios.get("/getResource2");
      return response;
    } catch (err) {
      throw err;
    }
  }
  async getResource3() {
    console.log();
    // const headers = {
    //   Authorization:
    //     `Bearer ${token}`,
    // };
    try {
      const response = await Axios.get("/getResource3");
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
