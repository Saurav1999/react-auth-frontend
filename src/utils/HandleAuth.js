import React, { useEffect } from "react";
import queryString from "query-string";
// import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../actions/userActions";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

//
const HandleAuth = ({ location, setUser }) => {
  const urlParams = queryString.parse(location.search);
  const authCode = urlParams["code"];
  let history = useHistory();
  useEffect(() => {
    if (authCode) {
      const getTokens = async (authCode) => {
        try {
          const response = await AuthService.getTokens(authCode);
          setUser(response.data);
          history.push("/dashboard");
        } catch (err) {
          if (err.response.status === 401) {
            console.log("Unable to fetch resource", err.response.status);
          } else {
            console.log("Couldn't get token", err.response.status);
          }
        }
      };
      getTokens(authCode);
    }
  }, [setUser, authCode, history]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch(setUser(payload)),
  };
};

//  mapDispatchToProps
export default connect(null, mapDispatchToProps)(HandleAuth);
