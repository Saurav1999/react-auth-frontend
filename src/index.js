import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";

//redux
import { Provider } from "react-redux";
import store from './store';

//Router
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById("root")
);
