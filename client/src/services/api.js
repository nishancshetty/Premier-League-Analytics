import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getStandings = async () => {
  const { data } = await API.get("/standings");
  return data;
};

export const getFixtures = async () => {
  const { data } = await API.get("/fixtures");
  return data;
};

export const getTeams = async () => {
  const { data } = await API.get("/standings");
  return data.standings[0].table;
};

export default API;