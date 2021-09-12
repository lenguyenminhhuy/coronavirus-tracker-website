import "./Nav.css";
import React from "react";
import { Flex, Heading, Text, Link, Divider } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { GiWorld } from "react-icons/gi";
import { FcComboChart, FcNews, EmailIcon } from "react-icons/fc";
import { Link as RRLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Flex
      w="100%"
      h={[null, null, "100vh"]}
      left="0"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      borderRightRadius={["0", "0", "20px"]}
      backgroundColor="#fff"
      color="#020202"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      className="my-nav"
    >
      {/* Nav Top */}
      <Flex flexDir="column" as="nav">
        <Heading
          mt={50}
          mb={[25, 50, 90]}
          fontSize="2xl"
          alignSelf="left"
          letterSpacing="tight"
          marginLeft="2vh"
        >
          Covid-19 Data Tracker
        </Heading>
        <Flex
          flexDir={["row", "row", "column", "column", "column"]}
          align={["center", "center", "center", "flex-start", "flex-start"]}
          justifyContent="center"
          alignItems="center"
        >
          <Link
            _hover={{ textDecor: "none", backgroundColor: "#eeeeee" }}
            backgroundColor={location.pathname === "/" ? "#eeeeee" : "#fff"}
            to="/"
            w="75%"
            mx={["20px", "20px", null, null, null]}
            mb={35}
            p={1}
            borderRadius="20px"
            as={RRLink}
          >
            <NavItem icon={GiWorld} title="WorldMap" color="#0F52BA" />
          </Link>
          <Link
            _hover={{ textDecor: "none", backgroundColor: "#eeeeee" }}
            backgroundColor={
              location.pathname === "/analysis" ? "#eeeeee" : "#fff"
            }
            to="/analysis"
            w="75%"
            mx={["20px", "20px", null, null, null]}
            mb={35}
            p={1}
            borderRadius="20px"
            as={RRLink}
          >
            <NavItem icon={FcComboChart} title="Analysis" />
          </Link>
          <Link
            _hover={{ textDecor: "none", backgroundColor: "#eeeeee" }}
            backgroundColor={location.pathname === "/news" ? "#eeeeee" : "#fff"}
            to="/news"
            w="75%"
            mx={["20px", "20px", null, null, null]}
            mb={35}
            p={1}
            borderRadius="20px"
            as={RRLink}
          >
            <NavItem icon={FcNews} title="News" />
          </Link>
        </Flex>
      </Flex>
      {/* Nav Bottom */}
      <Flex w="100%" flexDir="column" alignItems="center" mb={4}>
        <Divider color="#e6e6e6" />

        <Flex mt={4} align="center">
          <Text textAlign="center">@Team42-COSC2638</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
