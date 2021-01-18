import validateToken from "./validateToken";
import AuthService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { setUser } from "../actions/userActions";
import Cookie from "js-cookie";

import {
  setRefreshingStart,
  setRefreshingDone,
} from "../actions/processesActions";
import { useEffect } from "react";

const PersistLogin = async () => {

  const dispatch = useDispatch();

  const setUserState = (token, refreshToken) => {
    dispatch(setUser({ token, refreshToken }));
    return Promise.resolve();
  };

  useEffect(() => {
   
    if (!Cookie.get("loggedIn")) {
      localStorage.clear();
      return;
    }
    
    
    const refreshAccessToken = async (refreshToken) => {
      try {
        dispatch(setRefreshingStart());
        const response = await AuthService.refreshAccessToken(refreshToken);
        const token = response.data.token;
        setUserState(token, refreshToken).then(() => {
          dispatch(setRefreshingDone());
          // window.onload = function () {
         
          // };
          //  window.onbeforeunload =  (e) => {
         
          // };
        });
      } catch (err) {
        if (err.response.status === 401) {
          console.log(
            "Invalid Refresh Token, Refresh Failed.",
            err.response.status
          );
        }
      }
    };

    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    if (refreshToken) {
      console.log("executed");
      const tokenValidation = validateToken(refreshToken);
      if (tokenValidation.status === "NOT_EXPIRED") {
        console.log("trying refresh");
        refreshAccessToken(refreshToken);
      }
    }
    // eslint-disable-next-line
  }, [dispatch]);
};
export default PersistLogin;
