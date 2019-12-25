import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Menu from './Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  console.log(Menu.options)
  return (
    <Router>
      <div className="App">
        <Menu.Menu></Menu.Menu>
        {
          Menu.options.map(option => 
            <Route exact path={"/" + option.link} component={option.content} key={option.link}></Route>
          )
        }
      </div>
    </Router>
  );
}

export default App;
