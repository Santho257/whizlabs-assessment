import { Container } from "@chakra-ui/react";
import AllItems from "./components/custom/AllItems";
import AddItem from "./components/custom/AddItem";
import ItemById from "./components/custom/ItemById";
import { Route, Routes } from "react-router-dom";
import Err404 from "./components/custom/Err404";
import { Toaster } from "./components/ui/toaster";
const App = () => {
  return (
    <Container>
      <Toaster />
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/:id" element={<ItemById />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<AddItem />} />
        <Route path="/*" element={<Err404 />} />
      </Routes>
    </Container>
  );
}

export default App