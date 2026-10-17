import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Fixtures from "./pages/Fixtures";
import Standings from "./pages/Standings";
import Team from "./pages/Team";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Player from "./pages/Player";
import PlayerComparison from "./pages/PlayerComparison";
import AILab from "./pages/AILab";
import Analytics from "./pages/Analytics";
import News from "./pages/News";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      {/* Intro Experience */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Analytics Platform Shell */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/standings"
        element={
          <Layout>
            <Standings />
          </Layout>
        }
      />

      <Route
        path="/fixtures"
        element={
          <Layout>
            <Fixtures />
          </Layout>
        }
      />

      <Route
        path="/teams"
        element={
          <Layout>
            <Teams />
          </Layout>
        }
      />

      <Route
        path="/team/:id"
        element={
          <Layout>
            <Team />
          </Layout>
        }
      />

      <Route
        path="/players"
        element={
          <Layout>
            <Players />
          </Layout>
        }
      />

      <Route
        path="/player/:id"
        element={
          <Layout>
            <Player />
          </Layout>
        }
      />

      <Route
        path="/compare"
        element={
          <Layout>
            <PlayerComparison />
          </Layout>
        }
      />

      <Route
        path="/ai"
        element={
          <Layout>
            <AILab />
          </Layout>
        }
      />

      <Route
        path="/analytics"
        element={
          <Layout>
            <Analytics />
          </Layout>
        }
      />

      <Route
        path="/news"
        element={
          <Layout>
            <News />
          </Layout>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;