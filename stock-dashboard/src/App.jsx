import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""} style={{ minHeight: "100vh" }}>
<BrowserRouter>
        <Navbar toggle={() => setDark(!dark)} dark={dark} />
        <Routes>
          <Route path="/" element={<Home dark={dark} />} />
          <Route path="/watchlist" element={<Watchlist dark={dark} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;