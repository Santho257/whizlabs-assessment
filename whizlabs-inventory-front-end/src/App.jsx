import { Container } from "@chakra-ui/react";
import AllItems from "./components/custom/AllItems";
import AddItem from "./components/custom/AddItem";
import ItemById from "./components/custom/ItemById";
const App = () => {
  return (
    <Container>
      {/* <AllItems />
      <AddItem id={"67371de9b9c39f2956836357"} /> */}
      <ItemById id={"67371de9b9c39f2956836357"} />
    </Container>
  );
}

export default App