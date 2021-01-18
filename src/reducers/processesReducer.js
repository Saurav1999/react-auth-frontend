const defaultState = {
   refreshingToken: false,
    
}
const processesReducer = (state = defaultState, action) => {
    switch(action.type){
        case "FETCH_REFRESH_STARTED":
            
            return {
                refreshingToken: true,
            }
        case "FETCH_REFRESH_DONE":
            return{
                refreshingToken: false,
            }
        default: return state
    }
}

export default processesReducer