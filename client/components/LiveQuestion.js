import React from "react";
import { useQuery } from "react-query";
import { Center, Text } from "@chakra-ui/react";

import { getLiveQuestion } from "../services/Questions";

export const LiveQuestion = () => {
  const { data: question } = useQuery("liveQuestion", getLiveQuestion, {
    refetchInterval: 1000,
  });

  return (
    <Center bg="white" borderRadius="md" p={4} flexGrow="1">
      <Text fontSize="3xl" fontWeight="bold" textTransform="uppercase">
        {question?.content ?? "Pas de question en cours"}
      </Text>
    </Center>
  );
};
