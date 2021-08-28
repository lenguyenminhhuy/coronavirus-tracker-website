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
          alignSelf="center"
          letterSpacing="tight"
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
          <Text textAlign="center">@Corana-virus-Tracking</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

// <div style={{ display: "flex", height: "100%" }}>
//   <CDBSidebar
//     textColor=""
//     backgroundColor="#fff"
//     style={{ boxShadow: "0px 4px 42px rgba(0,0,0,0.07)" }}
//   >
//     <CDBSidebarContent className="sidebar-content">
//       <CDBSidebarMenu>
//         <NavLink exact to="/" activeClassName="">
//           <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
//         </NavLink>
//         <NavLink exact to="/analysis" activeClassName="">
//           <CDBSidebarMenuItem icon="table">Analysis</CDBSidebarMenuItem>
//         </NavLink>
//         <NavLink exact to="/news" activeClassName="">
//           <CDBSidebarMenuItem icon="newspaper">
//             Latest News
//           </CDBSidebarMenuItem>
//         </NavLink>
//       </CDBSidebarMenu>
//     </CDBSidebarContent>

//     <CDBSidebarFooter style={{ textAlign: "center" }}>
//       <div
//         style={{
//           padding: "20px 5px",
//         }}
//       >
//         @Corana-virus-Tracking
//       </div>
//     </CDBSidebarFooter>
//   </CDBSidebar>
// </div>
// );
// };

export default Sidebar;
