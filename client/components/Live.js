import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { LiveQuestion } from "./LiveQuestion";
import { TwicthIFrame } from "./TwicthIFrame";

export const Live = () => (
  <Box>
    <Heading>Question en cours</Heading>
    <Flex direction="column" height="100%">
      <LiveQuestion />
      <Box flexGrow="1">
        <TwicthIFrame />
      </Box>
    </Flex>
  </Box>
);
