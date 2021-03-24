import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { putMessage } from "../../services/Messages";

export const Message = ({ message, ...rest }) => {
  const queryClient = useQueryClient();
  const isQuestionMutation = useMutation(putMessage);

  const handleSetIsQuestion = () => {
    isQuestionMutation.mutate(
      { ...message, isQuestion: !message.isQuestion },
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
      bg={message.isQuestion ? "green.50" : "white"}
      {...rest}
    >
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
    </Box>
  );
};
