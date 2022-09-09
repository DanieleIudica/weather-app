import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { MainSearch } from "./components/MainSearch";
import { NotFound } from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
