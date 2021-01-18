import userReducer from './userReducer'
import processesReducer from './processesReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userData:userReducer,
    processes:processesReducer 
    
})

export default rootReducer