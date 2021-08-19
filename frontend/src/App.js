// import logo from './logo.svg';
import './App.css';
import List from './pages/List';
import Home from './pages/Home';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <BrowserRouter>
          <Nav/>
        </BrowserRouter>
      </div>
    )
    return (
      <BrowserRouter>
        <Switch>
          <App/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
