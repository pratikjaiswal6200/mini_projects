import { createContext, useState, useEffect } from "react";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  // Load watchlist from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("stockWatchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem("stockWatchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addStock = (stock) => {
    if (!watchlist.find((s) => s.symbol === stock.symbol)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const removeStock = (symbol) => {
    setWatchlist(watchlist.filter((s) => s.symbol !== symbol));
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  return (
    <StockContext.Provider
      value={{ watchlist, addStock, removeStock, clearWatchlist }}
    >
      {children}
    </StockContext.Provider>
  );
};
