import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/fixtures" element={<Fixtures />} />
    </Routes>
  );
}

export default App;