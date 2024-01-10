import "./App.css";
import "react-widgets/styles.css";
import { Routes, Route, Link } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import MenuPage from "./pages/MenuPage";
import ProductsPage from "./pages/ProductsPage";
import PurchasesPage from "./pages/PurchasesPage";
import AddProduct from "./components/products/AddProduct";
import EditProduct from "./components/products/EditProduct";
import EditCustomer from "./components/customers/EditCustomer";

function App() {
  return (
    <>
      <h1 style={{ borderBottom: "1px solid" }}>Store Management</h1>
      <div>
        <div style={{ fontSize: "30px", marginBottom:"15px", textAlign:"left"}}>
          <Link to="/store-management">Main Menu</Link>
        </div>
      </div>

      <Routes>
        <Route path="/store-management" element={<MenuPage />} />
        <Route path="/products" element={<ProductsPage />}> 
          <Route path="add/:customerID/:customerName" element={<AddProduct/>}/>
          <Route path="edit/:productID/:productName/:productPrice/:productQuantity" element={<EditProduct/>}/>
          <Route path="edit/:customerID" element={<EditCustomer/>}/>
        </Route>
        <Route path="/customers" element={<CustomersPage />}>
          <Route path="edit/:customerID" element={<EditCustomer/>}/>
        </Route>
        <Route path="/purchases" element={<PurchasesPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
