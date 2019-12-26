import React from 'react';
import './App.css';
import * as Menu from './Menu';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import {Container} from "react-bootstrap"

function App() {
  return (
    <Router>
      <Menu.Menu></Menu.Menu>
      <Container className="App">
        {
          Menu.options.map(option => 
            <Route exact path={"/" + option.link} component={option.content} key={option.link}></Route>
          )
        }
      </Container>
    </Router>
  );
}

export default App;
