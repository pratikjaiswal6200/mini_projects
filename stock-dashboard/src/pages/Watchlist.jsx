import { useContext } from "react";
import { StockContext } from "../context/StockContent";
import { useEffect, useState } from "react";
import { getStockQuote } from "../services/stockservices";

function Watchlist() {
  const { watchlist, removeStock, clearWatchlist } = useContext(StockContext);
  const [stockPrices, setStockPrices] = useState({});

  // Fetch live prices for watchlist stocks
  useEffect(() => {
    const fetchPrices = async () => {
      const prices = {};
      for (const stock of watchlist) {
        const quote = await getStockQuote(stock.symbol);
        if (quote) {
          prices[stock.symbol] = quote;
        }
      }
      setStockPrices(prices);
    };

    if (watchlist.length > 0) {
      fetchPrices();
      // Auto-refresh every 10 seconds
      const interval = setInterval(fetchPrices, 10000);
      return () => clearInterval(interval);
    }
  }, [watchlist]);

  return (
    <div className="container">
      <div className="watchlist-header">
        <h2>My Watchlist</h2>
        <span className="stock-count">{watchlist.length} stocks</span>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>No stocks in your watchlist yet.</p>
          <p className="empty-hint">
            Add stocks from the home page to track them here.
          </p>
        </div>
      ) : (
        <>
          <div className="watchlist-actions">
            <button onClick={clearWatchlist} className="btn btn-danger">
              Clear All
            </button>
          </div>

          <div className="watchlist-grid">
            {watchlist.map((stock, index) => {
              const quote = stockPrices[stock.symbol];
              const changeValue = quote
                ? parseFloat(quote.change || 0)
                : parseFloat(stock.change || 0);
              const isPositive = changeValue >= 0;

              return (
                <div key={index} className="watchlist-card">
                  <div className="watchlist-card-header">
                    <h3>{stock.symbol}</h3>
                    <button
                      onClick={() => removeStock(stock.symbol)}
                      className="remove-btn"
                      title="Remove from watchlist"
                    >
                      ×
                    </button>
                  </div>
                  <p className="stock-name">{stock.name}</p>
                  <p className="price">
                    {quote
                      ? `$${quote.price.toFixed(2)}`
                      : stock.price
                        ? `$${stock.price.toFixed(2)}`
                        : "Loading..."}
                  </p>
                  <div
                    className={`price-change ${isPositive ? "green" : "red"}`}
                  >
                    <span>
                      {isPositive ? "+" : ""}
                      {quote ? quote.change : stock.change || 0} (
                      {isPositive ? "+" : ""}
                      {quote ? quote.changePercent : stock.changePercent || 0}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Watchlist;