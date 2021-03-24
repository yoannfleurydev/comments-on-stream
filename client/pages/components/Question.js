import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "react-query";
import { putMessage } from "../../services/Messages";

export const Question = ({ question, ...rest }) => {
  const isQuestionMutation = useMutation(putMessage);

  const handleSetIsQuestion = () => {
    isQuestionMutation.mutate(
      { ...question, isQuestion: !question.isQuestion },
      {
        onSettled: () => {
          queryClient.invalidateQueries("questions");
          queryClient.invalidateQueries("messages");
        },
      }
    );
  };

  return (
    <Box
      shadow="base"
      p="2"
      rounded="md"
      onClick={handleSetIsQuestion}
      bg={question.isQuestion ? "green.50" : "white"}
      {...rest}
    >
      <Flex alignItems="center">
        <Icon as={FaUser} />{" "}
        <Text fontSize="sm" ml={2}>
          {question.displayName}
        </Text>
      </Flex>
      <Divider my={2} />
      <Box>
        <Text>{question.content}</Text>
      </Box>
    </Box>
  );
};
