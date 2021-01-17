import React from "react";


const handleLogin= () => {
 
  window.location="http://localhost:5000/auth/login"
}
function Main() {
  // console.log(props)

  
  return <button className="btn" onClick={()=>{handleLogin()}}>LOG IN</button>;
}


// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUser: () => dispatch(setUser())
//   }mapDispatchToProps
// }

export default Main
