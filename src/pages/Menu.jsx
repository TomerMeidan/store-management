import { Link } from "react-router-dom";

const Menu = () => {
  return (
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
  );
};

export default Menu;
