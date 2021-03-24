import {
  Box,
  IconButton,
  Flex,
  Heading,
  Text,
  Icon,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MdCheck, MdDelete } from "react-icons/md";
import {
  putMessage,
  deleteMessages,
  getMessages,
} from "../../services/Messages";
import { Card } from "./Card";
import { Empty } from "./Empty";

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
      <Box height="87vh" overflow="auto" mt={4}>
        {messages.length === 0 ? (
          <Empty>Aucun message disponible pour le moment</Empty>
        ) : (
          <Stack spacing={2}>
            {messages.map((message) => (
              <Card message={message} key={message._id}>
                <Button
                  size="xs"
                  leftIcon={<MdCheck />}
                  onClick={() => handleSetIsQuestion(message)}
                  colorScheme={message.isQuestion ? "green" : "gray"}
                >
                  Add question
                </Button>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
