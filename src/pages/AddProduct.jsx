/* eslint-disable react/prop-types */
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Combobox } from "react-widgets";
import db from "../utils/firebase";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const products = useSelector((state) => state.productsReducer.products);
  const { costumerID, costumerName } = useParams();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [saveStatus, setSaveStatus] = useState(false);
  const [exitAddWindow, setExitAddWindow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (exitAddWindow) navigate(-1);
  }, [exitAddWindow]);

  const addPurchase = async () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const obj = {
      costumerID,
      productID: selectedProduct.id,
      date: `${day}/${month}/${year}`,
      price: selectedProduct.price,
    };
    await addDoc(collection(db, "purchases"), obj).then(setSaveStatus(true));
  };

  return (
    <div style={{ border: "1px solid" }}>
      <div style={{ float: "right" }}>
        <button onClick={() => setExitAddWindow(true)}>X</button>
      </div>
      <br />
      <br />
      Name:{` ${costumerName}`}
      <br />
      ID:{` ${costumerID}`}
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
      <p>{saveStatus ? "New Purchase Added!" : null}</p>
      {
        // TODO Save the product to the costumer
      }
    </div>
  );
};

export default AddProduct;
