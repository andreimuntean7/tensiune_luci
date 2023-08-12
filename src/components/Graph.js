import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

function Graph({ measures, filter }) {
  const m = measures
    .map((measure) => {
      if (measure.type === filter) {
        return measure;
      }
      return null;
    })
    .filter((formattedDate) => formattedDate !== null);

  const labels = m
    .map((measure) => {
      if (measure.type === filter) {
        return format(measure.creation_date, "dd/MM/yyyy kk:mm:ss").toLocaleString();
      }
      return null;
    })
    .filter((formattedDate) => formattedDate !== null);

  console.log(labels);

  const dia = m.map((measure) => measure.type === filter && measure.dia);
  const sys = m.map((measure) => measure.type === filter && measure.sys);
  const pulse = m.map((measure) => measure.type === filter && measure.pulse);
  const data = {
    labels,
    datasets: [
      {
        label: "Dia",
        data: dia,
        borderColor: "rgb(0, 204, 0)",
        backgroundColor: "rgba(0, 204, 0, 0.5)",
      },
      {
        label: "Sys",
        data: sys,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Sys",
        data: pulse,
        borderColor: "rgb(255, 102, 102)",
        backgroundColor: "rgba(255,102, 102, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default Graph;
