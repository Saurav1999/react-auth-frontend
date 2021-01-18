import jwtDecode from "jwt-decode";
import moment from "moment";

const validateToken = (token) => {
  let status = "EXPIRED_TOKEN";
  const tokenExpiration = jwtDecode(token).exp;
  const tokenExpirationTimeInSeconds =
    tokenExpiration - moment(Math.floor(Date.now() / 1000));
  if (tokenExpiration && tokenExpirationTimeInSeconds <= 30) {
    status = "EXPIRED_TOKEN";
  } else if (
    tokenExpiration &&
    tokenExpirationTimeInSeconds < 100 &&
    tokenExpirationTimeInSeconds > 30
  ) {
    status = "ABOUT_TO_EXPIRE";
  } else {
    status = "NOT_EXPIRED";
  }

  console.log(tokenExpiration);
  console.log(tokenExpirationTimeInSeconds);
  console.log(status);

  return { status };
};
export default validateToken;
