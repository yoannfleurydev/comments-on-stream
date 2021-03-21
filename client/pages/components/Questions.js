import {
  Box,
  IconButton,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { MdDelete } from "react-icons/md";
import { FaEye, FaUser } from "react-icons/fa";
import { getQuestions } from "../../services/Messages";

export const Questions = (props) => {
  const { data: questions, error, isLoading } = useQuery(
    "questions",
    getQuestions,
    {
      refetchInterval: 1000,
    }
  );

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
      <Box mt={4}>
        {questions.length === 0 ? (
          <Box>
            <Text>Aucune question sélectionnée pour le moment</Text>
          </Box>
        ) : (
          questions.map((question) => (
            <Flex
              shadow="base"
              p="2"
              rounded="md"
              bg="white"
              key={question._id}
              mt={2}
              px={2}
              justifyContent="space-between"
            >
              <Box>
                <Flex alignItems="center">
                  <Icon as={FaUser} />{" "}
                  <Text fontSize="sm" ml={2}>
                    {question.displayName}
                  </Text>
                </Flex>
                <Text mt={2}>{question.content}</Text>
              </Box>

              <HStack spacing={2}>
                <IconButton
                  aria-label="Supprimer la question"
                  icon={<MdDelete />}
                  colorScheme="red"
                  variant="ghost"
                />
                <IconButton
                  aria-label="Afficher la question"
                  icon={<FaEye />}
                />
              </HStack>
            </Flex>
          ))
        )}
      </Box>
    </Box>
  );
};
