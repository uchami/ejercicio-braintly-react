import React from 'react';
import './App.css';
import * as Menu from './Menu';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
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
