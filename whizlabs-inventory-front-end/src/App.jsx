import { Container } from "@chakra-ui/react";
import AllItems from "./components/custom/AllItems";
import AddItem from "./components/custom/AddItem";
const App = () => {
  return (
    <Container>
      <AllItems />
      <AddItem id={"67371de9b9c39f2956836357"} />
    </Container>
  );
}

export default App