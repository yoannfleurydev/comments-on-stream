import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Grid, GridItem, Heading, Spacer } from "@chakra-ui/layout";
import { useTheme } from "@chakra-ui/system";
import { MdDelete } from "react-icons/md";
import { Live } from "../components/Live";
import { Messages } from "../components/Messages";
import { Questions } from "../components/Questions";

export default function Home() {
  const theme = useTheme();

  const maxHeight = `calc(100vh - ${theme.layout.topBar.height})`;

  return (
    <Box p={4}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} height="3rem">
        <GridItem>
          <Heading>Messages</Heading>
        </GridItem>
        <GridItem>
          <Heading>Questions</Heading>
        </GridItem>
        <GridItem>
          <Heading>Live</Heading>
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Messages maxHeight={maxHeight} />
        <Questions maxHeight={maxHeight} />
        <Live />
      </Grid>
    </Box>
  );
}
