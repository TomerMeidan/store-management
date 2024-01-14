/* eslint-disable react/prop-types */
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Combobox } from "react-widgets";
import db from "../../utils/firebase";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const navigate = useNavigate();
  const { customerID, customerName } = useParams();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [exitAddWindow, setExitAddWindow] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (exitAddWindow) navigate("..");
  }, [exitAddWindow]);

  const addPurchase = async () => {
    if (+selectedProduct.quantity <= 0) {
      setActionMessage("Not enough quantity! can't add the product.");
      return;
    }

    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const obj = {
      customerID,
      productID: selectedProduct.id,
      date: `${day}/${month}/${year}`,
      price: selectedProduct.price,
    };
    await addDoc(collection(db, "purchases"), obj).then(() => {
      decreaseProductQuantity();
    });
  };

  const decreaseProductQuantity = async () => {
    const docRef = doc(db, "products", selectedProduct.id);
    await updateDoc(docRef, {
      ...selectedProduct,
      quantity: +selectedProduct.quantity - 1,
    }).then(() => {
      console.log("New product added to customer successfully!");
      setActionMessage("New product added to customer successfully!");
    });
  };

  return (
    <div style={{ border: "1px solid" }}>
      <div style={{ float: "right" }}>
        <button onClick={() => setExitAddWindow(true)}>X</button>
      </div>
      <h2>Add new product</h2>
      Name:{` ${customerName}`}
      <br />
      ID:{` ${customerID}`}
      <br />
      <div style={{ width: "50%", margin: "20px auto" }}>
        <Combobox
          data={products}
          defaultValue={""}
          dataKey={"id"}
          textField="name"
          onChange={(value) => setSelectedProduct(value)}
        />
      </div>
      <button
        onClick={() => {
          addPurchase();
        }}
      >
        Save
      </button>
      <br />
      <br />
      <p>{actionMessage}</p>
    </div>
  );
};

export default AddProduct;
