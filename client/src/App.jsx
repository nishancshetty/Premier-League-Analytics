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

import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      {/* Teams */}
      <Route
        path="/teams"
        element={
          <Layout>
            <Teams />
          </Layout>
        }
      />

      {/* Fixtures */}
      <Route
        path="/fixtures"
        element={
          <Layout>
            <Fixtures />
          </Layout>
        }
      />

      {/* Live Match */}
      <Route
        path="/live"
        element={
          <Layout>
            <LiveMatch />
          </Layout>
        }
      />

      {/* Standings */}
      <Route
        path="/standings"
        element={
          <Layout>
            <Standings />
          </Layout>
        }
      />

      {/* Team Page */}
      <Route
        path="/team/:id"
        element={
          <Layout>
            <Team />
          </Layout>
        }
      />

      {/* Player Page */}
      <Route
        path="/player/:id"
        element={
          <Layout>
            <Player />
          </Layout>
        }
      />

      {/* AI Player Comparison */}
      <Route
        path="/compare"
        element={
          <Layout>
            <PlayerComparison />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;