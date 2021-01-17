const defaultState = {
    loggedIn: false,
    token:null,
    refreshToken:null,
    user:null,
    
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_USER":
            localStorage.setItem('authData',JSON.stringify(action.payload))
            return {
                loggedIn: true,
                token:action.payload.token,
                refreshToken:action.payload.refreshToken,
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                loggedIn: false,
                token:null,
                refreshToken:null,
            }
        default: return state
    }
}

export default userReducer