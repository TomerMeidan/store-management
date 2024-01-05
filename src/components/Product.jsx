/* eslint-disable react/prop-types */

import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../utils/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const [purchasesList, setPurchasesList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [historyVisibility, setHistoryVisibility] = useState(false);

  useEffect(() => {
    setCustomersList([]);
    purchasesList?.map((purchase) => {
      // Query purchasing  costumers for the given costumers ID
      const costumersQuery = query(
        collection(db, "customers"),
        where("id", "==", purchase.costumerID)
      );

      getDocs(costumersQuery).then((querySnapshot) => {
        setCustomersList((prevCustomersList) => [
          ...prevCustomersList,
          ...querySnapshot.docs.map((doc) => {
            return {
              name: `${doc.data().firstName} ${doc.data().lastName}`,
              date: purchase.date,
              costumerID: doc.data().id,
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
    getDocs(purchaseQuery).then((querySnapshot) => {
      setPurchasesList(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        })
      );
    });
  }, [product]);



  return (
    <div>
      <div>
        {
          // TODO Send product link to edit page
        }
        Name: <Link>{product.name}</Link> <br />
        Price: {product.price} <br />
        Quantity: {product.quantity}
        <br />
      </div>{" "}
      <br />
      <div>
        <button>Edit</button>{" "}
        <button onClick={() => setHistoryVisibility(!historyVisibility)}>
          Purchase History
        </button>
        <br />
        <br />
        <div className="products-history">
          {historyVisibility
            ? customersList?.map((costumer) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid",
                      padding: "15px",
                    }}
                    key={costumer.id}
                  >
                    {" "}
                    <div style={{ paddingRight: "50px" }}>
                      {
                        // TODO Send costumer link to edit page
                      }
                      {`NAME:`} <Link>{`${costumer.name}`}</Link> <br />{" "}
                      {`DATE: ${costumer.date} `}
                    </div>{" "}
                    <button
                      onClick={() => navigate(`add/${costumer.costumerID}/${costumer.name}`)}
                      style={{ marginLeft: "auto" }}
                    >
                      Add
                    </button>
                    {
                      // TODO Make total purchases an object in redux reducer
                    }
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
