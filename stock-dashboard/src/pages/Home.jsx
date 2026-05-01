import { useEffect, useState } from "react";
import StockCard from "../components/StockCard";
import Chart from "../components/Chart";
import { getStocks, getStockHistory } from "../services/stockservices";

function Home() {
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [loading, setLoading] = useState(true);

  // Fetch initial stock data
  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      const data = await getStocks();
      setStocks(data);
      setLoading(false);
    };
    loadStocks();

    // Auto-refresh every 10 seconds for live updates
    const interval = setInterval(async () => {
      const updatedStocks = await getStocks();
      setStocks(updatedStocks);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Fetch chart data when stock is selected
  useEffect(() => {
    const loadChart = async () => {
      const data = await getStockHistory(selectedStock);
      setChartData(data);
    };
    loadChart();
  }, [selectedStock]);

  const handleStockClick = (symbol) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="container">
      <div className="market-summary">
        <span className="live-indicator">● LIVE</span>
        <span className="market-time">
          Market: {new Date().toLocaleTimeString()}
        </span>
      </div>

      <Chart data={chartData} selectedStock={selectedStock} />

      <div className="stock-list-header">
        <h2>Top Stocks</h2>
        <p className="stock-count">{stocks.length} stocks</p>
      </div>

      {loading ? (
        <div className="loading">Loading stock data...</div>
      ) : (
        <div className="grid">
          {stocks.map((stock, index) => (
            <StockCard
              key={index}
              stock={stock}
              onClick={() => handleStockClick(stock.symbol)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
