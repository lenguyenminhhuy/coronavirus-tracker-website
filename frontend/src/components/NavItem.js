import React from "react";
import { Flex, Menu, MenuButton, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, title, color }) => {
  return (
    <Flex
      flexDir="row"
      textAlign="center"
      alignItems="center"
      alignSelf="center"
    >
      <Flex>
        <Icon fontSize="3xl" as={icon} color={color} />
      </Flex>
      <Flex>
        <Text m="auto" ml="2" fontSize="2xl">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NavItem;
