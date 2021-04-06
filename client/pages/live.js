import React from "react";

import { getLiveQuestion } from "../services/Questions";
import { Box, Center } from "@chakra-ui/layout";
import { useQuery } from "react-query";

export default function Live() {
  const { data: question, error, isLoading } = useQuery(
    "liveQuestion",
    getLiveQuestion,
    {
      refetchInterval: 1000,
    }
  );

  return (
    <Box h="100vh">
      <Center h="100%">{question?.content}</Center>
    </Box>
  );
}
