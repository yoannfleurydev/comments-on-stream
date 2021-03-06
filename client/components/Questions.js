import {
  Box,
  IconButton,
  Flex,
  Heading,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MdDelete } from "react-icons/md";
import { getQuestions, putMessage } from "../services/Messages";
import { Empty } from "./Empty";
import { Question } from "./Question";

export const Questions = (props) => {
  const queryClient = useQueryClient();
  const {
    data: questions,
    error,
    isLoading,
  } = useQuery("questions", getQuestions, {
    refetchInterval: 1000,
  });

  const isQuestionMutation = useMutation(putMessage, {
    onSettled: () => {
      queryClient.invalidateQueries("questions");
      queryClient.invalidateQueries("messages");
    },
  });

  const handleSetIsQuestion = (message) => {
    isQuestionMutation.mutate({ ...message, isQuestion: !message.isQuestion });
  };

  if (isLoading) return "Récupération des questions...";
  if (error) return "Une erreur est survenue: " + error.message;

  return (
    <Box overflow="auto" {...props}>
      {/* <Flex justifyContent="space-between">
        <IconButton
          aria-label="Supprimer les questiona"
          icon={<MdDelete />}
          colorScheme="brand"
          // onClick={handleRemoveAll}
        />
      </Flex> */}
      <Box>
        {questions.length === 0 ? (
          <Empty>Aucune question sélectionnée pour le moment</Empty>
        ) : (
          <Stack m={2} spacing={3}>
            {questions.map((question) => (
              <Question key={question._id} question={question} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
