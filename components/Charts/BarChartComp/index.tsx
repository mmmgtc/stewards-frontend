import { Bar, BarChart } from "recharts";

const BarChartComp = ({data}) => {
  return <BarChart width={150} height={150} data={data}>
  <Bar dataKey="uv" fill="#8884d8" />
</BarChart>
}

export default BarChartComp;