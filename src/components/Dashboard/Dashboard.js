import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { logUserOut } from "../../actions/userActions";
import { useHistory } from "react-router-dom";
import UserService from "../../services/user.service";


function Dashboard({ user, token, logUserOut, loggedIn, refreshingToken }) {
  let history = useHistory();
  const [resource, setResource] = useState("");
  const [resource2, setResource2] = useState("");
  const [resource3, setResource3] = useState("");

  const handleLogOut = () => {
    logUserOut();
    history.push("/");

  };
  const getResource2 = async() => {
    try {
      const response = await UserService.getResource2();
      setResource2(response.data.resource);
      console.log(response.data.resource);
    } catch (err) {
      console.log("Invalid Token");
    }
  }
  const getResource3 = async() => {
    try {
      const response = await UserService.getResource3();
      setResource3(response.data.resource);
      console.log(response.data.resource);
    } catch (err) {
      console.log("Invalid Token");
    }
  }
  useEffect(() => {
    async function getResource(token) {
      try {
        const response = await UserService.getResource();
        setResource(response.data.resource);
        console.log(response.data.resource);
      } catch (err) {
        console.log("Invalid Token");
      }
    }

    getResource(token);
  }, [token]);

  useEffect(() => {
    const forceLogout = () => {
      if (!localStorage.getItem("refreshToken") || !sessionStorage.getItem('loggedIn')) {
        handleLogOut();
      }
    };
    window.addEventListener("storage", forceLogout);
    

    return () => {
      window.removeEventListener("storage", forceLogout);
    };
    // eslint-disable-next-line
  }, []);

  if (loggedIn) {
    return (
      <div className="dashcontent">
        <h1>Welcome to dashboard {user}</h1>
        <p>{resource}</p>
        <p>{resource2}</p>
        

        <button className="btn" onClick={getResource2}>
          Get resource 2
        </button>
        <p>{resource3}</p>
        

        <button className="btn" onClick={getResource3}>
          Get resource 3
        </button>
        <button className="btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    );
  } else {
    window.location = "http://localhost:5000/auth/login";
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.userData.token,
    user: state.userData.user,
    loggedIn: state.userData.loggedIn,
    refreshingToken: state.processes.refreshingToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logUserOut: () => dispatch(logUserOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
