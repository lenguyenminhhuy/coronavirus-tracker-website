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
  Divider,
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
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
      borderRadius="0 20px 20px 0"
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
          alignSelf="center"
          letterSpacing="tight"
        >
          Covid-19 Data Tracker
        </Heading>
        <Flex
          flexDir={["column"]}
          align={["center", "center", "center", "flex-start", "flex-start"]}
          justifyContent="center"
        >
          {/* <NavItem icon={GiWorld} title="Our World" /> */}
          <Flex
            className="sidebar-items active"
            py={2}
            px="5%"
            alignSelf="center"
          >
            <Link display={["flex", "flex", "flex", "flex", "flex"]}>
              <Icon as={GiWorld} fontSize="3xl" color="#0F52BA"></Icon>
            </Link>
            <Link
              _hover={{ textDecor: "none" }}
              display={["flex", "flex", "none", "flex", "flex"]}
            >
              <Text>Our world</Text>
            </Link>
          </Flex>
          <Flex className="sidebar-items" py={2} px="5%" alignSelf="center">
            <Link display={["flex", "flex", "flex", "flex", "flex"]}>
              <Icon as={FcComboChart} fontSize="3xl"></Icon>
            </Link>
            <Link
              _hover={{ textDecor: "none" }}
              display={["flex", "flex", "none", "flex", "flex"]}
              href="/analysis"
              passHref
            >
              <Text>Analysis</Text>
            </Link>
          </Flex>
          <Flex className="sidebar-items" py={2} px="5%" alignSelf="center">
            <Link display={["flex", "flex", "flex", "flex", "flex"]}>
              <Icon as={FcNews} fontSize="3xl"></Icon>
            </Link>
            <Link
              _hover={{ textDecor: "none" }}
              display={["flex", "flex", "none", "flex", "flex"]}
            >
              <Text>News</Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
      {/* Nav Bottom */}
      <Flex w="100%" flexDir="column" alignItems="center" mb={4}>
        <Divider color="#e6e6e6" />
        <Flex mt={4} align="center">
          <Text textAlign="center">@Corana-virus-Tracking</Text>
        </Flex>
      </Flex>
      {/* </Flex> */}
    </Flex>

    // <div
    //   style={{ display: 'flex', height: '100%'}}
    // >
    //   <CDBSidebar textColor="" backgroundColor="#fff" style={{boxShadow: '0px 4px 42px rgba(0,0,0,0.07)'}} >
    //     <CDBSidebarContent className="sidebar-content">
    //       <CDBSidebarMenu>
    //         <NavLink exact to="/" activeClassName="">
    //           <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
    //         </NavLink>
    //         <NavLink exact to="/analysis" activeClassName="">
    //           <CDBSidebarMenuItem   icon="table">Analysis</CDBSidebarMenuItem>
    //         </NavLink>
    //         <NavLink exact to='/news' activeClassName="">
    //           <CDBSidebarMenuItem icon="newspaper">Latest News</CDBSidebarMenuItem>
    //         </NavLink>
    //       </CDBSidebarMenu>
    //     </CDBSidebarContent>

    //     <CDBSidebarFooter style={{ textAlign: 'center' }}>
    //       <div
    //         style={{
    //           padding: '20px 5px',
    //         }}
    //       >
    //         @Corana-virus-Tracking
    //       </div>
    //     </CDBSidebarFooter>
    //   </CDBSidebar>
    // </div>
  );
};

export default Sidebar;
