import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import WorldMap from "./pages/Home";
import { Flex, Icon, useDisclosure, Circle } from "@chakra-ui/react";
import Analysis from "./pages/Analysis";
import News from './pages/News';
import SubscribeModal from "./components/shared/SubscribeModal";
import { MdMail } from "react-icons/md";
import colors from "./constants/colors";

function App () {
  const {isOpen, onOpen, onClose} = useDisclosure();

    return (
      <BrowserRouter>
        <Circle 
        size={20} 
        bg={colors.grayLight} 
        boxShadow="rgba(0, 0, 0, 0.2) 0px 0px 10px"  
        borderColor={colors.grayDarker}  
        borderWidth={1} 
        borderColor={colors.grayLightest} 
        _hover={{cursor: 'pointer'}} 
        onClick={onOpen}
        position="fixed"
        right={10}
        bottom={10}
        zIndex={1000}
        >
          <Icon w={10} h={10} as={MdMail} color={colors.grayLightest} />
        </Circle>
        <SubscribeModal isOpen={isOpen} onClose={onClose}/>
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
              <Route path="/news" component={News}/>
            </Switch>
          </Flex>
        </Flex>
      </BrowserRouter>
    );
}


export default App;
