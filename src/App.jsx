import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Customers from "./pages/Customers";
import Menu from "./pages/Menu";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";

function App() {
  return (
    <>
      <h1 style={{ borderBottom: "1px solid" }}>Store Management</h1>
      <div className="menu">
        <div style={{ fontSize: "30px" }}>
          <Link to="/">Main Menu</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </>
  );
}

export default App;
