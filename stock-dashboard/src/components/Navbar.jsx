import { Link } from "react-router-dom";

function Navbar({ toggle, dark }) {
  return (
    <div className={`navbar ${dark ? "dark" : ""}`}>
      <div>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/watchlist" className="navbar-link">Watchlist</Link>
      </div>

      <button onClick={toggle} className="toggle-btn">🌙</button>
    </div>
  );
}

export default Navbar;