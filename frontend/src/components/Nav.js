import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import {
  Flex,
  Heading,
  Text,
  Icon,
  Link,
  Box,
  LinkBox,
  Button,
  NextLink,
  LinkOverlay,
  Divider,
  IconButton,
} from "@chakra-ui/react";
// import { BiWorld } from "react-icons/bi";
import { FcComboChart, FcNews } from "react-icons/fc";
import { GiWorld } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import "./Nav.css";

const Sidebar = () => {
  return (
    <Flex
      w="100%"
      h={[null, null, "100vh"]}
      left="0"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.02)"
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
            href="/"
            w="75%"
            mx={["20px", "20px", null, null, null]}
            mb={35}
            p={1}
            borderRadius="20px"
          >
            <NavItem icon={GiWorld} title="WorldMap" color="#0F52BA" />
          </Link>
          <Link
            _hover={{ textDecor: "none", backgroundColor: "#eeeeee" }}
            href="/analysis"
            w="75%"
            mx={["20px", "20px", null, null, null]}
            mb={35}
            p={1}
            borderRadius="20px"
          >
            <NavItem icon={FcComboChart} title="Analysis" />
          </Link>
          <Link
            _hover={{ textDecor: "none", backgroundColor: "#eeeeee" }}
            // href="/news"
            w="75%"
            mx={["20px", "20px", null, null, null]}
            mb={35}
            p={1}
            borderRadius="20px"
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

