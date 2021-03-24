import { Box, IconButton, Flex, Heading, Stack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MdDelete } from "react-icons/md";
import {
  putMessage,
  deleteMessages,
  getMessages,
} from "../../services/Messages";
import { Message } from "./Message";
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
    onSettled: () => {
      queryClient.invalidateQueries("questions");
    },
  });

  const handleRemoveAll = () => {
    deleteAllMessagesMutation.mutate();
  };

  if (isLoading) return "Récupération des messages...";
  if (error) return "Une erreur est survenue: " + error.message;

  return (
    <Box {...props}>
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
              <Message key={message._id} message={message} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
