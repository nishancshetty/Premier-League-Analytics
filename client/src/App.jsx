import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Fixtures from "./pages/Fixtures";

function App() {
  return (
    <Routes>
      {/* Figma Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Dashboard Layout */}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />} />
        <Route path="players" element={<Players />} />
        <Route path="fixtures" element={<Fixtures />} />
      </Route>

      {/* Backwards-compatibility for direct /teams, /players, /fixtures routes */}
      <Route path="/teams" element={<Navigate to="/dashboard/teams" replace />} />
      <Route path="/players" element={<Navigate to="/dashboard/players" replace />} />
      <Route path="/fixtures" element={<Navigate to="/dashboard/fixtures" replace />} />
    </Routes>
  );
}

export default App;