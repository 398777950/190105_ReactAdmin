import React from 'react';
import './App.css';
// import { render } from 'less';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
//引入组件
import Login from './pages/login/login'
import Admin from './pages/admin/index'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handClick = () => {

  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' component={Admin}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;