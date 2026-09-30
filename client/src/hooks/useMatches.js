import { useEffect, useState } from "react";
import api from "../services/api";

export default function useMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        const { data } = await api.get("/football/matches");
        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  return { matches, loading };
}