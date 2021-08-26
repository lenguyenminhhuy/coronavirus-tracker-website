import React from "react";
import { Flex, Menu, MenuButton, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavItem = ({ icon, title }) => {
  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems="center">
      <Menu>
        <Link backgroundColor="#eeeeee" p={3} borderRadius={8}>
          <MenuButton>
            <Flex>
              <Icon as={icon}></Icon>
              <Text>{title}</Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
