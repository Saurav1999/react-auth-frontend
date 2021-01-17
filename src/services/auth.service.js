import axios from "axios";

const API_URL = "http://localhost:5000";

class AuthService {
  async getTokens(authCode) {
    const response = await axios.post(API_URL + "/generateTokens", {
      code: authCode,
    });

    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
