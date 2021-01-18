import axios from "axios";

const API_URL = "http://localhost:5000";

class AuthService {
  async getTokens(authCode) {
    try {
      const response = await axios.get(API_URL + "/generateTokens", {
        params: {
          code: authCode,
        },
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
  async refreshAccessToken(refreshToken)
  {
    try {
      const response = await axios.post(API_URL + "/refreshAccessToken", {
      
          refreshToken,
        
      });

      return response;
    } catch (err) {
      throw err;
    }
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
