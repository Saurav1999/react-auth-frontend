import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logUserOut } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Dashboard({ token,logUserOut }) {
  let history = useHistory();
  const [resource, setResource] = useState("");

  const handleLogOut = () => {
    logUserOut();
    history.push("/");
  };
  useEffect(() => {
    async function getResource() {
      const headers = {
        Authorization:
          `Bearer ${token}`,
      };
    
      try{
        let response = await axios.get(
          "http://localhost:5000/getResource",
          
          { headers }
        );
        setResource(response.data.resource);
        console.log(response.data.resource);
      }
      catch(err)
      {
        console.log("Invalid Token");
      }
     
      
      
    }

    getResource();
  }, [token]);
  return (
    <div className="dashcontent">
      <h1>Welcome to dashboard</h1>
      <p>{resource}</p>
      <button className="btn" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logUserOut: () => dispatch(logUserOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
