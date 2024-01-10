import Product from "../components/products/Product";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";


const ProductsPage = () => {
  const location = useLocation();

  const totalPurchases = useSelector(
    (state) => state.purchasesReducer.totalPurchases
  );
  const products = useSelector((state) => state.productsReducer.products);

  return (
    <div>
      <div className="products-box">
        {products?.map((product) => {
          return (
            <div className="product" key={product.id}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
      <div className="products-page-outlet-box">
        <Outlet key={location.pathname}/>
      </div>
      <div className="total-box">
        {
          <>
            <h2>Total Purchases</h2>

            <h3>{totalPurchases} NIS</h3>
          </>
        }
      </div>
    </div>
  );
};

export default ProductsPage;
