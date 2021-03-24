import {
  Box,
  IconButton,
  Flex,
  Heading,
  Text,
  Stack,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getQuestions, putMessage } from "../../services/Messages";
import { Card } from "./Card";
import { Empty } from "./Empty";

export const Questions = (props) => {
  const queryClient = useQueryClient();
  const { data: questions, error, isLoading } = useQuery(
    "questions",
    getQuestions,
    {
      refetchInterval: 1000,
    }
  );

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
    <Box m="1rem" {...props}>
      <Flex justifyContent="space-between">
        <Heading>Questions</Heading>
        <IconButton
          aria-label="Supprimer les questiona"
          icon={<MdDelete />}
          colorScheme="brand"
          // onClick={handleRemoveAll}
        />
      </Flex>
      <Box mt={4} height="87vh" overflow="auto">
        {questions.length === 0 ? (
          <Empty>Aucune question sélectionnée pour le moment</Empty>
        ) : (
          <Stack spacing={2}>
            {questions.map((question) => (
              <Card key={question._id} message={question}>
                <ButtonGroup size="xs">
                  <Button
                    leftIcon={<FaTrash />}
                    onClick={() => handleSetIsQuestion(question)}
                  >
                    Supprimer
                  </Button>
                  <Button leftIcon={<FaEye />}>Afficher</Button>
                </ButtonGroup>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
