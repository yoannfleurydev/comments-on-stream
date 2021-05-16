import { Box, IconButton, Flex, Stack } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
// import { MdDelete } from "react-icons/md";
import { deleteMessages, getMessages } from "../services/Messages";
import { Message } from "./Message";
import { Empty } from "./Empty";

export const Messages = (props) => {
  const queryClient = useQueryClient();
  const {
    data: messages,
    error,
    isLoading,
  } = useQuery("messages", getMessages, {
    refetchInterval: 1000,
  });

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
    <Box overflow="auto" {...props}>
      {/* <Flex>
        <IconButton
          aria-label="Supprimer les messages"
          icon={<MdDelete />}
          colorScheme="brand"
          onClick={handleRemoveAll}
          isLoading={isLoading}
        />
      </Flex> */}

      {messages.length === 0 ? (
        <Empty>Aucun message disponible pour le moment</Empty>
      ) : (
        <Stack m={2} spacing={3}>
          {messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        </Stack>
      )}
    </Box>
  );
};
