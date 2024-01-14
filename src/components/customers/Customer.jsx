/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import db from "../../utils/firebase";

const Customer = ({ customer }) => {
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [productsHidden, setProductsHidden] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!productsHidden) getCustomerProducts();
    else setBoughtProducts([]);
  }, [productsHidden]);

  const getCustomerProducts = () => {
    // Query the Purchases collection for purchases made by this customer
    const purchasesQuery = query(
      collection(db, "purchases"),
      where("customerID", "==", customer.id)
    );

    getDocs(purchasesQuery).then((querySnapshot) => {
      let boughtProducts = [];

      // Extract the product IDs from the purchases
      const productsQuery = getProductsBoughtByCustomer(
        querySnapshot,
        boughtProducts
      );

      getDocs(productsQuery).then((querySnapshot) => {
        let productsData = [];

        // Convert the query results into an array of product objects
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });

        const p = getBoughtProductsNames(boughtProducts, productsData);

        // Update the products state with the new data
        setBoughtProducts(p);
      });
    });
  };
  return (
    <>
      <td>{`${customer.firstName} ${customer.lastName}`}</td>
      <td>{customer.city}</td>
      <td>
        {boughtProducts?.map((product, index) => {
          return (
            <div key={index} className="customer-bought-product-row">
              <div>
                <Link
                  to={`products/edit/${product.productID}/${product.name}/${product.price}/${product.quantity}`}
                >
                  {product.name}
                </Link>
              </div>
              <div>{product.date}</div>
            </div>
          );
        })}

        {productsHidden ? (
          <button onClick={() => setProductsHidden(!productsHidden)}>
            Show Products
          </button>
        ) : (
          <button onClick={() => setProductsHidden(!productsHidden)}>
            Hide Products
          </button>
        )}
      </td>
      <td>
        <button
          onClick={() =>
            navigate(
              `add/${customer.id}/${
                customer.firstName + " " + customer.lastName
              }`
            )
          }
          style={{ marginLeft: "auto" }}
        >
          Add
        </button>
      </td>
    </>
  );
};

export default Customer;
function getBoughtProductsNames(boughtProducts, productsData) {
  return boughtProducts.map((boughtProduct) => {
    const product = productsData.find(
      (product) => product.id === boughtProduct.productID
    );

    if (product) {
      return {
        ...boughtProduct,
        name: product.name,
        quantity: product.quantity,
      };
    } else {
      return boughtProduct;
    }
  });
}

function getProductsBoughtByCustomer(querySnapshot, boughtProducts) {
  querySnapshot.forEach((doc) => {
    const data = { ...doc.data() };
    boughtProducts.push(data);
  });

  // Now query the Products collection for products with these IDs
  const productsQuery = query(
    collection(db, "products"),
    where(
      "id",
      "in",
      boughtProducts.map((product) => product.productID)
    )
  );
  return productsQuery;
}
