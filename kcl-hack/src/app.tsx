import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/google";
import Home from "./pages/home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/Signin`} element={<Signin />} />
        <Route path={`/Home`} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;