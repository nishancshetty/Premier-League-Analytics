import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import LiveMatch from "./pages/LiveMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/fixtures" element={<Fixtures />} />
      <Route path="/live" element={<LiveMatch />} />
    </Routes>
  );
}

export default App;