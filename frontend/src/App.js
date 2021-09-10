import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import WorldMap from './pages/Home';
import List from './pages/List';
import { Grid, GridItem } from "@chakra-ui/react";
import Analysis from "./pages/Analysis";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grid
          templateColumns="repeat(10,1fr)"
          gap={6}
        >
          <GridItem colSpan={1}>
            <Nav/>
          </GridItem>
          <GridItem colSpan={9}>
            <Switch>
              <Route exact path="/">
                  <WorldMap/>
              </Route>
              <Route path="/analysis">
                  <Analysis/>
              </Route>
              <Route path="/news">
                  <List/>
              </Route>
            </Switch>
          </GridItem>
        </Grid>

      </BrowserRouter>
    );
  }
}

export default App;
