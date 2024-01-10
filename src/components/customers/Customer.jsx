/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { Link } from "react-router-dom";
import db from "../../utils/firebase";

const Customer = ({ customer }) => {
  const [boughtProducts, setBoughtProducts] = useState([]);

  useEffect(() => {
    getCustomerProducts();
  }, []);

  const getCustomerProducts = () => {
    // Query the Purchases collection for purchases made by this customer
    const purchasesQuery = query(
      collection(db, "purchases"),
      where("customerID", "==", customer.id)
    );

    getDocs(purchasesQuery).then((querySnapshot) => {
      let productIDs = [];

      // Extract the product IDs from the purchases
      querySnapshot.forEach((doc) => {
        productIDs.push(doc.data().productID);
      });

      // Ensure productIds has unique values
      productIDs = Array.from(new Set(productIDs));

      // Now query the Products collection for products with these IDs
      const productsQuery = query(
        collection(db, "products"),
        where("id", "in", productIDs)
      );

      getDocs(productsQuery).then((querySnapshot) => {
        let productsData = [];

        // Convert the query results into an array of product objects
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        // Update the products state with the new data
        setBoughtProducts(productsData);
      });
    });
  };
  return (
    <tr>
      <td>{`${customer.firstName} ${customer.lastName}`}</td>
      <td>{customer.city}</td>
      <td>
        {" "}
        {boughtProducts?.map((product) => {
          return (
            <div key={product.id}>
              <Link
                to={`products/edit/${product.id}/${product.name}/${product.price}/${product.quantity}`}
              >
                {product.name}
              </Link>
            </div>
          );
        })}
      </td>
      <td>
        <button>Add</button>
      </td>
    </tr>
  );
};

export default Customer;
