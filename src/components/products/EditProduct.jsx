import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import db from "../../utils/firebase";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// TODO Region 2 – A list of all its customers.
// Each customer name is a link that redirect to “Edit Customer” page

const EditProduct = () => {
  const buyingCustomers = useSelector((state) => state.purchasesReducer.buyingCustomers);
  const { productID, productName, productPrice, productQuantity } = useParams();
  const navigate = useNavigate();
  const [exitAddWindow, setExitAddWindow] = useState(false);

  const [name, setName] = useState(productName);
  const [price, setPrice] = useState(productPrice);
  const [quantity, setQuantity] = useState(productQuantity);

  useEffect(() => {
    if (exitAddWindow) navigate("..");
  }, [exitAddWindow]);

  const handleUpdateProduct = async () => {
    const docRef = doc(db, "products", productID);

    await updateDoc(docRef, {
      name,
      price,
      quantity,
    }).then(console.log("Product and references updated successfully"));
  };

  const handleDeleteProduct = async () => {
    const productRef = doc(db, "products", productID);
    const purchasesRef = collection(db, "purchases");

    // Delete from products table
    await deleteDoc(productRef).then(async () => {
      // Delete from purchases table by productID
      const querySnapshot = await getDocs(
        query(purchasesRef, where("productID", "==", productID))
      );

      querySnapshot.forEach(async (doc) => {
        // Delete each reference in the purchases collection
        await deleteDoc(doc.ref);
      });

      // Add success message or redirect the user
      console.log("Product and references deleted successfully");
      setExitAddWindow(true);
    });
  };

  return (
    <div style={{ border: "1px solid" }}>
      <div style={{ float: "right" }}>
        <button onClick={() => setExitAddWindow(true)}>X</button>
      </div>
      <h2>Edit product details</h2>
      <b>ID:</b> {productID} <br />
      <br />
      <b>Name:</b>{" "}
      <input
        type="text"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <br />
      <b>Price:</b>{" "}
      <input
        type="number"
        defaultValue={+price}
        onChange={(e) => setPrice(+e.target.value)}
      />{" "}
      <br />
      <br />
      <b>Quantity:</b>{" "}
      <input
        type="number"
        defaultValue={+quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      />{" "}
      <br />
      <br />
      <button onClick={handleUpdateProduct}>Save</button>
      <button onClick={handleDeleteProduct}>Delete</button>
      <br/><br/>
      <h3>List of Buying Customers</h3>

      {buyingCustomers.map((customer) => {
        return <div key={customer.customerID}>
          <Link > {customer.name}</Link>
        </div>;
      })}

    </div>
  );
};

export default EditProduct;
