import React from "react";
import { Icon, SlideFade } from "@chakra-ui/react";
import { FiTwitch } from "react-icons/fi";

import { getLiveQuestion } from "../services/Questions";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { useQuery } from "react-query";

export default function Live() {
  const { data: question, error } = useQuery("liveQuestion", getLiveQuestion, {
    refetchInterval: 1000,
  });

  return (
    <Box h="100vh">
      <Center h="100%">
        <SlideFade
          in={question?.content && !error}
          transition={{ enter: { duration: 0.5 } }}
        >
          <Box width="90vw" fontSize="4xl">
            <Flex
              bg="brand.700"
              color="white"
              fontWeight="700"
              p={2}
              direction="row"
              alignItems="center"
            >
              <Icon as={FiTwitch} />
              <Text ml={4}>{question?.displayName}</Text>
            </Flex>
            <Box bg="white" color="brand.900" p={2}>
              <Text ml={4}>{question?.content}</Text>
            </Box>
          </Box>
        </SlideFade>
      </Center>
    </Box>
  );
}
