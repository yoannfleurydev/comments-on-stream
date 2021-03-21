import {
  Box,
  IconButton,
  Flex,
  Heading,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaUser } from "react-icons/fa";
import { MdCheck, MdDelete } from "react-icons/md";
import {
  putMessage,
  deleteMessages,
  getMessages,
} from "../../services/Messages";

export const Messages = (props) => {
  const queryClient = useQueryClient();
  const { data: messages, error, isLoading } = useQuery(
    "messages",
    getMessages,
    {
      refetchInterval: 1000,
    }
  );

  const deleteAllMessagesMutation = useMutation(deleteMessages, {
    onMutate: async () => {
      queryClient.setQueryData("messages", () => []);
    },
  });

  const isQuestionMutation = useMutation(putMessage);

  const handleRemoveAll = () => {
    deleteAllMessagesMutation.mutate();
  };

  const handleSetIsQuestion = (message) => {
    isQuestionMutation.mutate({ ...message, isQuestion: !message.isQuestion });
  };

  if (isLoading) return "Récupération des messages...";
  if (error) return "Une erreur est survenue: " + error.message;

  return (
    <Box m="1rem" {...props}>
      <Flex justifyContent="space-between">
        <Heading>Messages</Heading>
        <IconButton
          aria-label="Supprimer les messages"
          icon={<MdDelete />}
          colorScheme="brand"
          onClick={handleRemoveAll}
          isLoading={isLoading}
        />
      </Flex>
      <Stack mt={4} spacing={2}>
        {messages.length === 0 ? (
          <Box>
            <Text>Aucun message disponible pour le moment</Text>
          </Box>
        ) : (
          messages.map((message) => (
            <Flex
              shadow="base"
              p="2"
              rounded="md"
              bg="white"
              key={message._id}
              px={2}
              justifyContent="space-between"
            >
              <Box>
                <Flex alignItems="center">
                  <Icon as={FaUser} />{" "}
                  <Text fontSize="sm" ml={2}>
                    {message.displayName}
                  </Text>
                </Flex>
                <Text mt={2}>{message.content}</Text>
              </Box>

              <IconButton
                aria-label="Ajouter aux questions"
                icon={<MdCheck />}
                onClick={() => handleSetIsQuestion(message)}
                colorScheme={message.isQuestion ? "green" : "gray"}
              />
            </Flex>
          ))
        )}
      </Stack>
    </Box>
  );
};
