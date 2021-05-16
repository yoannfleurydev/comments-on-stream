import React from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { LiveQuestion } from "./LiveQuestion";
import { TwicthIFrame } from "./TwicthIFrame";

export const Live = () => (
  <Flex direction="column" height="100%">
    <LiveQuestion />
    <Box mt={4} p={4} bg="white" shadow="md" borderRadius="md">
      <TwicthIFrame />
    </Box>
  </Flex>
);
