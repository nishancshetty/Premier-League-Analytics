import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Fixtures from "./pages/Fixtures";
import LiveMatch from "./pages/LiveMatch";
import Standings from "./pages/Standings";
import Team from "./pages/Team";
import Teams from "./pages/Teams";
import Player from "./pages/Player";
import PlayerComparison from "./pages/PlayerComparison";
import AILab from "./pages/AILab";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />

      <Route path="/teams" element={<Layout><Teams /></Layout>} />

      <Route path="/fixtures" element={<Layout><Fixtures /></Layout>} />

      <Route path="/live" element={<Layout><LiveMatch /></Layout>} />

      <Route path="/standings" element={<Layout><Standings /></Layout>} />

      <Route path="/team/:id" element={<Layout><Team /></Layout>} />

      <Route path="/player/:id" element={<Layout><Player /></Layout>} />

      <Route path="/compare" element={<Layout><PlayerComparison /></Layout>} />

      <Route path="/ai" element={<Layout><AILab /></Layout>} />
    </Routes>
  );
}

export default App;