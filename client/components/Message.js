import Icon from "@chakra-ui/icon";
import { Box, Divider, Flex, HStack, Text, Tooltip } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import {
  BsFillQuestionCircleFill,
  BsQuestionCircle,
  BsFillEyeFill,
  BsEyeSlash,
} from "react-icons/bs";
import { useMutation, useQueryClient } from "react-query";
import { putMessage } from "../services/Messages";

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
      bg="white"
      cursor="pointer"
      {...rest}
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Icon as={FaUser} boxSize="3" />
          <Text fontSize="xs" ml={2}>
            {message.displayName}
          </Text>
        </Flex>
        <HStack>
          <Tooltip
            label={
              message.isQuestion ? "Est une question" : "N'est pas une question"
            }
            fontSize="md"
          >
            <Box>
              <Icon
                as={
                  message.isQuestion
                    ? BsFillQuestionCircleFill
                    : BsQuestionCircle
                }
                opacity={message.isQuestion ? 1 : 0.3}
                boxSize="3"
              />
            </Box>
          </Tooltip>
          <Tooltip
            label={message.isLive ? "Est visible" : "N'est pas visible"}
            fontSize="md"
          >
            <Box>
              <Icon
                as={message.isLive ? BsFillEyeFill : BsEyeSlash}
                opacity={message.isLive ? 1 : 0.3}
                boxSize="3"
              />
            </Box>
          </Tooltip>
        </HStack>
      </Flex>
      <Divider my={1} />
      <Box>
        <Text>{message.content}</Text>
      </Box>
    </Box>
  );
};
