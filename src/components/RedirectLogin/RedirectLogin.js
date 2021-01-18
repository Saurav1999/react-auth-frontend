import React,{useEffect} from "react";
import Loader from "react-loader-spinner";
const RedirectLogin = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location="http://localhost:5000/auth/login"

    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Loader
        type="ThreeDots"
        color="white"
        height={100}
        width={100}
        // timeout={3000} //3 secs
      />
    </div>
  );
}

export default RedirectLogin;
