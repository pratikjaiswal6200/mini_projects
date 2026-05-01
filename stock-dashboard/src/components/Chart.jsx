import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Chart({ data = [], selectedStock = "AAPL" }) {
  // Ensure data is valid
  const chartData = Array.isArray(data) && data.length > 0 ? data : [
    { time: "09:30", price: 0 },
    { time: "10:00", price: 0 },
  ];

  return (
    <div className="chart-container">
      <h3 style={{ marginBottom: "15px" }}>{selectedStock} - Intraday Prices</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "#9ca3af" }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "#9ca3af" }}
            domain={["auto", "auto"]}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "5px",
              color: "white",
            }}
            formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, "Price"]}
            labelStyle={{ color: "#9ca3af" }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;