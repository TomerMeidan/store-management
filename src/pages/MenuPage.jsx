import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginTop: "40px" }}>
        <div className="menu-box">
          <Link to="/products">Products</Link>
        </div>
        <div className="menu-box">
          <Link to="/purchases">Purchases</Link>
        </div>
        <div className="menu-box">
          <Link to="/customers">Customers</Link>
        </div>
      </div>
      <div style={{border: "1px solid", borderRadius:"25px", padding:"15px", margin:"0 auto"}}>
        <h2>Welcome to the store management system!</h2>
        <h3>Here you'll be able to perform various actions on certain products, <br/>
          customers and purchases that were made.</h3>
      </div>
    </div>
  );
};

export default MenuPage;
