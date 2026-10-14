import Home from "../../pages/Home";
import Fixtures from "../../pages/Fixtures";
import Standings from "../../pages/Standings";
import Analytics from "../../pages/Analytics";

const apps = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "🏠",
    component: Home,
  },
  {
    id: "fixtures",
    title: "Fixtures",
    icon: "⚽",
    component: Fixtures,
  },
  {
    id: "standings",
    title: "Standings",
    icon: "🏆",
    component: Standings,
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: "📊",
    component: Analytics,
  },
];

export default apps;