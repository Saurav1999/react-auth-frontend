import React,{useEffect} from 'react';
import queryString from "query-string";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../actions/userActions";
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";



//
const HandleAuth = ({location,dispatch,setUser}) => {
  
    const urlParams = queryString.parse(location.search);
    const authCode = urlParams["code"];
    let history = useHistory();
    useEffect(() => {
        
        if(authCode)
        {
            const getTokens = async (authCode) => {
                try {
                  const response = await axios.get(
                    `http://localhost:5000/generateTokens?code=${authCode}`
                  );
                
                  
                  setUser(response.data);
                  history.push("/dashboard");
              
                } catch (err) {
                  if (err.response.status === 404) {
                    console.log("Unable to fetch resource", err.response.status);
                  } else {
                    console.log("Couldn't get token", err.response.status);
                  }
                 
                  
                }
              
              };
              getTokens(authCode);
           
        }

     
    },[dispatch,authCode,history])

    
    
  return <Redirect to="/"/>;
};

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch(setUser(payload)),
  };
};

//  mapDispatchToProps
export default connect(mapStateToProps,mapDispatchToProps)(HandleAuth);
