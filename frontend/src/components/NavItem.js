import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

const NavItem = ({ icon, title, color }) => {
  return (
    <Flex
      flexDir="row"
      alignItems="center"
      justifyContent={[null, "center", "center", "center", "flex-start"]}
    >
      <Flex justifyContent="center">
        <Icon fontSize="2xl" as={icon} color={color} />
      </Flex>
      <Flex display={["flex", "flex", "none", "none", "flex"]}>
        <Text m="auto" ml="2" fontSize="2md">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default NavItem;
