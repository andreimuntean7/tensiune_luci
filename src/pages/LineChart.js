import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const LineChartComponent = (props) => {
  const myArray = props.data.map((item) => ({ label: new Date(item["createdAt"]["seconds"] * 1000), value: item["sys"] }));

  return (
    <div>
      <h2>props</h2>
      <LineChart width={400} height={300} data={myArray}>
        <XAxis dataKey="label" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
