// Demo stock data service - simulates live stock data
// Replace this with a real API (Finnhub, Alpha Vantage, etc.) when ready

const DEFAULT_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc.", price: 178.52 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 141.80 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 378.91 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.25 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50 },
  { symbol: "META", name: "Meta Platforms", price: 505.75 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 875.28 },
  { symbol: "JPM", name: "JPMorgan Chase", price: 198.45 },
  { symbol: "V", name: "Visa Inc.", price: 279.30 },
  { symbol: "WMT", name: "Walmart Inc.", price: 165.80 },
  { symbol: "DIS", name: "Walt Disney Co.", price: 112.45 },
  { symbol: "NFLX", name: "Netflix Inc.", price: 485.60 },
];

// Generate realistic price variations
const generatePriceChange = (basePrice) => {
  const changePercent = (Math.random() - 0.5) * 2; // -1% to +1%
  return basePrice * (1 + changePercent / 100);
};

// Get current stock prices with simulated live updates
export const getStocks = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  return DEFAULT_STOCKS.map((stock) => ({
    ...stock,
    price: generatePriceChange(stock.price),
    change: ((Math.random() - 0.5) * 4).toFixed(2),
    changePercent: ((Math.random() - 0.5) * 4).toFixed(2),
  }));
};

// Get stock quote by symbol
export const getStockQuote = async (symbol) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const stock = DEFAULT_STOCKS.find((s) => s.symbol === symbol);
  if (!stock) return null;
  
  const currentPrice = generatePriceChange(stock.price);
  const change = currentPrice - stock.price;
  
  return {
    symbol: stock.symbol,
    name: stock.name,
    price: currentPrice,
    change: change.toFixed(2),
    changePercent: ((change / stock.price) * 100).toFixed(2),
  };
};

// Get historical data for chart
export const getStockHistory = async (symbol, range = "1D") => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const stock = DEFAULT_STOCKS.find((s) => s.symbol === symbol) || DEFAULT_STOCKS[0];
  const basePrice = stock.price;
  
  // Generate intraday data points
  const data = [];
  const now = new Date();
  const startPrice = basePrice * (1 + (Math.random() - 0.5) * 0.1);
  
  for (let i = 0; i < 20; i++) {
    const time = new Date(now.getTime() - (19 - i) * 15 * 60 * 1000); // 15-min intervals
    const price = startPrice * (1 + (Math.random() - 0.5) * 0.05);
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      price: price.toFixed(2),
    });
  }
  
  return data;
};

// Get default stocks list
export const getDefaultStocks = () => DEFAULT_STOCKS;
