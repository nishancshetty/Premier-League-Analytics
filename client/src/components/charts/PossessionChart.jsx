import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PossessionChart() {

  const data = {
    labels: ["Home", "Away"],
    datasets: [
      {
        data: [61,39],
        backgroundColor:[
          "#1EF2C5",
          "#2B2B2B"
        ],
        borderWidth:0,
      },
    ],
  };

  const options = {
    plugins:{
      legend:{
        labels:{
          color:"white",
        },
      },
    },
  };

  return (
    <Doughnut
      data={data}
      options={options}
    />
  );
}

export default PossessionChart;