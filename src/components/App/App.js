import "./App.css";
import { Switch, Route } from "react-router-dom";

//components
import Main from "../Main/Main";
import Dashboard from "../Dashboard/Dashboard";
import HandleAuth from "../../utils/HandleAuth";
import RedirectLogin from '../RedirectLogin/RedirectLogin'


import persistLogin from '../../utils/persistLogin';
import { connect } from "react-redux";
import { setUser } from "../../actions/userActions";

function App({refreshingToken,loggedIn}) {


  persistLogin();

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/auth/callback" component={HandleAuth} />
        {!refreshingToken && loggedIn && <Route exact path="/dashboard" component={Dashboard} />}
        <Route exact path="/dashboard" component={RedirectLogin} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    refreshingToken: state.processes.refreshingToken,
    loggedIn: state.userData.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch(setUser(payload)),
  };
};

//  mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
