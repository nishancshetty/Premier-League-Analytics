import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import LiveMatch from "./pages/LiveMatch";
import Standings from "./pages/Standings";
import Team from "./pages/Team";
import Player from "./pages/Player";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Home />
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
        path="/live"
        element={
          <Layout>
            <LiveMatch />
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
        path="/team/:id"
        element={
          <Layout>
            <Team />
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
    </Routes>
  );
}

export default App;