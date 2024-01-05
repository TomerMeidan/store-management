import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../utils/firebase";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// TODO The name of each product is a LINK to the edit product page

const ProductsPage = () => {
  const dispatch = useDispatch();
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
      let totalPurchases = 0;
      querySnapshot.docs.map((doc) => {
        totalPurchases += +doc.data().price;
      });

      const action = {
        type: "add-purchase",
        payload: {
          totalPurchases: totalPurchases
        },
      };

      dispatch(action);
    });
  };

  useEffect(() => {
    getAllProducts();
    getAllPurchases();
  }, []);

  const setProducts = (productsData) => {
    const action = {
      type: "init-products",
      payload: {
        productsData,
      },
    };
    dispatch(action);
  };


  return (
    <div>
      <div className="products-box">
        {products?.map((product) => {
          return (
            <div key={product.id}>
              <div className="product">
                <Product product={product} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="products-page-outlet-box">
        <Outlet />
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
