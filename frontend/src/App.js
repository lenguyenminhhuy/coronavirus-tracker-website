import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import WorldMap from "./pages/Home";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import Analysis from "./pages/Analysis";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Flex
          h={[null, null, "150vh"]}
          flexDir={["column", "column", "row"]}
          overflow="hidden"
          maxW="2000px"
          // backgroundColor="#f5f6f8"
          backgroundColor="#f6f8fc"
        >
          <Flex w={["100%", "100%", "80px", "80px", "250px"]} pos="sticky">
            <Nav />
          </Flex>

          <Flex
            w={["100%", "100%", "100%"]}
            p={["0.5vh", "0.5vh", "1.5vh", "2vh", "3vh"]}
            // overflow="auto"
          >
            <Switch>
              <Route exact path="/" component={WorldMap} />
              <Route path="/analysis" component={Analysis} />
              {/* <Route path="/news" component={New} /> */}
            </Switch>
          </Flex>
        </Flex>

        {/* <Grid templateColumns="repeat(10,1fr)" gap={6}>
          <GridItem colSpan={1}>
            <Nav />
          </GridItem>
          <GridItem colSpan={9}>
            <Switch>
              <Route exact path="/" component={WorldMap} />
              <Route path="/analysis" component={Analysis} />
              {/* <Route path="/news" component={New} /> */}
        {/* </Switch> */}
        {/* </GridItem> */}
        {/* <WorldMap /> */}
        {/* </Route> */}
        {/* <Analysis /> */}
        {/* </Route> */}
        {/* </Grid> */}
      </BrowserRouter>
    );
  }
}

export default App;
