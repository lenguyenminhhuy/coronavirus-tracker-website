import React from "react";
import { Flex, Menu, MenuButton, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, title, color }) => {
  return (
    <Flex flexDir="row" alignItems="center">
      <Flex>
        <Icon fontSize="3xl" as={icon} color={color} />
      </Flex>
      <Flex display={["flex", "flex", "none", "none", "flex"]}>
        <Text m="auto" ml="2" fontSize="2xl">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NavItem;
