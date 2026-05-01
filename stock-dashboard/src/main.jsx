import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StockProvider } from "./context/StockContent";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StockProvider>
    <App />
  </StockProvider>
);