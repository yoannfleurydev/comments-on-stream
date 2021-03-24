import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const Empty = ({ children, ...rest }) => {
  return (
    <Box textAlign="center" bg="gray.300" p={4} borderRadius="md" {...rest}>
      <Text>{children}</Text>
    </Box>
  );
};
