import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Nav from "./components/Nav";
import WorldMap from "./pages/Home";
import Analysis from "./pages/Analysis";
import List from "./pages/List";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Flex
          flexDir={["column", "column", "row"]}
          overflow="hidden"
          maxW="2000px"
          backgroundColor="#f6f8fc"
        >
          <Flex
            className="leftColumn"
            h={["300px", "300px", null, null, null]}
            w={["100%", "100%", "80px", "80px", "250px"]}
          >
            <Nav />
          </Flex>
          <Flex
            className="rightColumn"
            ml={[null, null, "80px", "80px", "250px"]}
            mt={["300px", "300px", "0", "0", "0"]}
            p={["5px", "5px", "15px", "20px", "30px"]}
            pt={["15px", "15px", "10px", "10px", "10px"]}
          >
            <Switch>
              <Route exact path="/" component={WorldMap} />
              <Route path="/analysis" component={Analysis} />
              <Route path="/latest" component={List} />

            </Switch>
          </Flex>
        </Flex>
      </BrowserRouter>
    );
  }
}

export default App;
