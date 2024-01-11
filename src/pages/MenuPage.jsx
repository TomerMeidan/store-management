import { collection, onSnapshot, query } from "@firebase/firestore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../utils/firebase";
import { useDispatch } from "react-redux";

const MenuPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
    getAllPurchases();
    getAllCustomers();
  }, []);

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

  const getAllCustomers = () => {
    const customersQuery = query(collection(db, "customers"));
    onSnapshot(customersQuery, (querySnapshot) => {
      setCustomers(
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

  const setCustomers = (customersData) => {
    const action = {
      type: "init-customers",
      payload: {
        customersData,
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
      <div
        style={{
          border: "1px solid",
          borderRadius: "25px",
          padding: "15px",
          margin: "0 auto",
        }}
      >
        <h2>Welcome to the store management system!</h2>
        <h3>
          Here you'll be able to perform various actions on certain products,{" "}
          <br />
          customers and purchases that were made.
        </h3>
      </div>
    </div>
  );
};

export default MenuPage;
