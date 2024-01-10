import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../utils/firebase";
import Product from "../components/products/Product";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";


const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const totalPurchases = useSelector(
    (state) => state.purchasesReducer.totalPurchases
  );
  const products = useSelector((state) => state.productsReducer.products);

  const getAllProducts = () => {
    const productsQuery = query(collection(db, "products"));
    onSnapshot(productsQuery, (querySnapshot) => {
      setProducts(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  };

  const getAllPurchases = () => {
    const productsQuery = query(collection(db, "purchases"));
    onSnapshot(productsQuery, (querySnapshot) => {
      let tempTotalPurchases = 0;

      setPurchasedProducts(
        querySnapshot.docs.map((doc) => {
          tempTotalPurchases += +doc.data().price;
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );

      setTotalPurchases(tempTotalPurchases);
    });
  };

  useEffect(() => {
    getAllProducts();
    getAllPurchases();
  }, []);

  // TODO Optimize the methods into a single one

  const setProducts = (productsData) => {
    const action = {
      type: "init-products",
      payload: {
        productsData,
      },
    };
    dispatch(action);
  };

  const setPurchasedProducts = (purchasedProduct) => {
    const action = {
      type: "set-purchased-products",
      payload: {
        purchasedProduct,
      },
    };
    dispatch(action);
  };

  const setTotalPurchases = (totalPurchases) => {
    const action = {
      type: "add-purchase",
      payload: {
        totalPurchases,
      },
    };
    dispatch(action);
  };

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
