import { SimpleGrid } from "@chakra-ui/layout";
import { Messages } from "./components/Messages";
import { Questions } from "./components/Questions";

export default function Home() {
  return (
    <SimpleGrid columns={3} spacing={4} m={4}>
      <Messages />
      <Questions />
    </SimpleGrid>
  );
}
