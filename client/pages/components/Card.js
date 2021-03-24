import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export const Card = ({ children, message }) => {
  return (
    <Box shadow="base" p="2" rounded="md" bg="white">
      <Flex alignItems="center">
        <Icon as={FaUser} />{" "}
        <Text fontSize="sm" ml={2}>
          {message.displayName}
        </Text>
      </Flex>
      <Divider my={2} />
      <Box>
        <Text>{message.content}</Text>
      </Box>
      {children && (
        <>
          <Divider my={2} />
          {children}
        </>
      )}
    </Box>
  );
};
