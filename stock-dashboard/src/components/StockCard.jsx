import { useContext, useEffect, useState } from "react";
import { StockContext } from "../context/StockContent";

function StockCard({ stock, onClick }) {
  const { addStock, watchlist } = useContext(StockContext);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Check if stock is already in watchlist
  useEffect(() => {
    const exists = watchlist.some((s) => s.symbol === stock.symbol);
    setIsInWatchlist(exists);
  }, [watchlist, stock.symbol]);

  const handleClick = () => {
    if (onClick) {
      onClick(stock.symbol);
    }
  };

  const handleAddToWatchlist = (e) => {
    e.stopPropagation();
    if (!isInWatchlist) {
      addStock(stock);
    }
  };

  const changeValue = parseFloat(stock.change || 0);
  const isPositive = changeValue >= 0;

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-header">
        <h3 className="stock-symbol">{stock.symbol}</h3>
        <span className="stock-name">{stock.name}</span>
      </div>

      <p className="price">
        {stock.price ? `$${stock.price.toFixed(2)}` : "Loading..."}
      </p>

      <div className={`price-change ${isPositive ? "green" : "red"}`}>
        <span className="change-arrow">{isPositive ? "▲" : "▼"}</span>
        <span className="change-value">
          {isPositive ? "+" : ""}{stock.change || 0} (
          {isPositive ? "+" : ""}{stock.changePercent || 0}%)
        </span>
      </div>

      <button
        onClick={handleAddToWatchlist}
        className={`btn ${isInWatchlist ? "btn-disabled" : ""}`}
        disabled={isInWatchlist}
      >
        {isInWatchlist ? "Added ✓" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default StockCard;