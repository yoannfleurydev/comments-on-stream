import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { BsFillEyeFill, BsEyeSlash } from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { putQuestion } from "../services/Questions";

export const Question = ({ question, ...rest }) => {
  const queryClient = useQueryClient();

  const isLiveMutation = useMutation(putQuestion);

  const handleSetIsLive = () => {
    isLiveMutation.mutate(
      { ...question, isLive: !question.isLive },
      {
        onSettled: () => {
          queryClient.invalidateQueries("questions");
          queryClient.invalidateQueries("messages");
          queryClient.invalidateQueries("liveQuestion");
        },
      }
    );
  };

  return (
    <Box
      shadow="base"
      p="2"
      rounded="md"
      onClick={handleSetIsLive}
      bg="white"
      cursor="pointer"
      {...rest}
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Icon as={FaUser} boxSize={3} />
          <Text fontSize="xs" ml={2}>
            {question.displayName}
          </Text>
        </Flex>
        <Tooltip
          label={question.isLive ? "Est visible" : "N'est pas visible"}
          fontSize="md"
        >
          <Box>
            <Icon
              as={question.isLive ? BsFillEyeFill : BsEyeSlash}
              opacity={question.isLive ? 1 : 0.3}
              boxSize="3"
            />
          </Box>
        </Tooltip>
      </Flex>
      <Divider my={1} />
      <Box>
        <Text>{question.content}</Text>
      </Box>
    </Box>
  );
};
