import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import MenuPage from "./pages/MenuPage";
import ProductsPage from "./pages/ProductsPage";
import PurchasesPage from "./pages/PurchasesPage";

function App() {
  return (
    <>
      <h1 style={{ borderBottom: "1px solid" }}>Store Management</h1>
      <div>
        <div style={{ fontSize: "30px" }}>
          <Link to="/">Main Menu</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
      </Routes>
    </>
  );
}

export default App;
