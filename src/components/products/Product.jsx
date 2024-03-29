/* eslint-disable react/prop-types */

import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import db from "../../utils/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import removeDuplicates from "../../utils/util";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [purchasesList, setPurchasesList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [historyVisibility, setHistoryVisibility] = useState(false);
  const [editClick, setEditClick] = useState(false);

  useEffect(() => {
    const list = removeDuplicates(customersList, "customerID")
    setBuyingCustomers(list);
  }, [customersList, editClick]);

  useEffect(() => {
    setCustomersList([]);
    purchasesList?.map((purchase) => {
      // Query purchasing  costumers for the given costumers ID
      const customersQuery = query(
        collection(db, "customers"),
        where("id", "==", purchase.customerID)
      );

      getDocs(customersQuery).then((querySnapshot) => {
        setCustomersList((prevCustomersList) => [
          ...prevCustomersList,
          ...querySnapshot.docs.map((doc) => {
            return {
              name: `${doc.data().firstName} ${doc.data().lastName}`,
              date: purchase.date,
              customerID: doc.data().id,
              purchaseID: purchase.id,
              productDetails: purchase.productDetails
            };
          }),
        ]);
      });
    });
  }, [purchasesList]);

  useEffect(() => {
    // Query purchases for the given product ID
    const purchaseQuery = query(
      collection(db, "purchases"),
      where("productID", "==", product.id)
    );

    // Get customer IDs from the purchases
    onSnapshot(purchaseQuery, (querySnapshot) => {
      setPurchasesList(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            productDetails: {
              ...product
            }
          };
        })
      );
    });

  }, []);

  const setBuyingCustomers = (buyingCustomers) => {
    const action = {
      type: "set-purchasing-customers",
      payload: {
        buyingCustomers,
      },
    };
    dispatch(action);
  };


  return (
    <div>
      <div>
        Name: <Link>{product.name}</Link> <br />
        Price: {product.price} <br />
        Quantity: {product.quantity}
        <br />
      </div>{" "}
      <br />
      <div>
        <button
          onClick={() => {
            setEditClick(!editClick);
            navigate(
              `edit/${product.id}/${product.name}/${product.price}/${product.quantity}`
            );
          }}

        >
          Edit
        </button>{" "}
        <button onClick={() => setHistoryVisibility(!historyVisibility)}>
          Purchase History
        </button>
        <br />
        <br />
        <div className="products-history">
          {historyVisibility
            ? customersList?.map((customer) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid",
                      padding: "15px",
                    }}
                    key={customer.purchaseID}
                  >
                    {" "}
                    <div style={{ paddingRight: "50px" }}>
                      {`NAME:`} <Link to={`edit/${customer.customerID}`}>{`${customer.name}`}</Link> <br />{" "}
                      {`DATE: ${customer.date} `}
                    </div>{" "}
                    <button
                      onClick={() =>
                        navigate(`add/${customer.customerID}/${customer.name}`)

                      }
                      style={{ marginLeft: "auto" }}
                    >
                      Add
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Product;
