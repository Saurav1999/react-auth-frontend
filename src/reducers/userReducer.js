import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
const defaultState = {
    loggedIn: false,
    token:null,
    refreshToken:null,
    user:null,
    
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_USER":
            localStorage.setItem('refreshToken',JSON.stringify(action.payload.refreshToken))
            sessionStorage.setItem('loggedIn',true);
            Cookie.set('loggedIn',true);

            const user = jwtDecode(action.payload.refreshToken).user;
            return {
                loggedIn: true,
                token:action.payload.token,
                refreshToken:action.payload.refreshToken,
                user
            }
        case "LOG_OUT":
            localStorage.clear()
            // Cookie.remove('loggedIn');
            Object.keys(Cookie.get()).forEach(function (cookieName) {
                Cookie.remove(cookieName);
              });
            return {
                loggedIn: false,
                token:null,
                refreshToken:null,
                user:null
            }
        default: return state
    }
}

export default userReducer