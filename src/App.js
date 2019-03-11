import React, { Component } from "react";
import "./Styles/App.css";
import TypeTest from "./Components/Typetest";
import Navbar from "./Components/Navbar.js";
import NotFound from "./Components/NotFound.js";
import { Route, BrowserRouter as Router, Switch, MemoryRouter } from 'react-router-dom'; 

class App extends Component {
  render() {
    return (
      <MemoryRouter>
        <div>
          <Route component={Navbar}/>
          <Switch>
            <Route exact path="/" component={TypeTest}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </MemoryRouter>
    );
  }
}

export default App;