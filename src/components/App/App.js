import './App.css'
import {Switch, Route} from 'react-router-dom';

//components
import Main from '../Main/Main'
import Dashboard from '../Dashboard/Dashboard'
import HandleAuth from '../../utils/HandleAuth'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/auth/callback" component={HandleAuth}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </Switch>
     
    </div>
  );
}

export default App;
