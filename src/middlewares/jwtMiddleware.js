import store from "../store";
import AuthService from "../services/auth.service";
import {setRefreshingStart,setRefreshingDone} from '../actions/processesActions'
import {setUser} from '../actions/userActions'

const setUserState = (token, refreshToken) => {
    store.dispatch(setUser({ token, refreshToken }));
    return Promise.resolve();
  };
const refreshAccessToken = async (refreshToken) => {
    try {
      store.dispatch(setRefreshingStart());
      const response = await AuthService.refreshAccessToken(refreshToken);
      const token = response.data.token;
      setUserState(token, refreshToken).then(() => {
        store.dispatch(setRefreshingDone());
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

export default function jwtMiddleware({ dispatch, getState }) {
   
  return (next) => (action) => {
      console.log("middleware succesful")
    switch (action.type) {
      case "EXPIRED_TOKEN":
        console.log("expire middleware");
        const refreshToken = store.getState().userData.refreshToken;
        refreshAccessToken(refreshToken);
        
        
        break;
      case "ABOUT_TO_EXPIRE":
        //Take actions based on almost expiry of token
       
        break;
        default:
            break
    }
    return next(action);
  };
}
