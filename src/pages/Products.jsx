import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../firebase";

const Products = () => {
  const [products, setProducts] = useState();

  const getAll = () => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (querySnapshot) => {
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

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      {products?.map((product) => {
        return (
          <div key={product.id}>
            <div className="products">
              {
                // TODO Create Product component
              }
              <div>
                Name: {product.name} <br />
                Price: {product.price} <br />
                Quantity: {product.quantity}
              </div>
              <div style={{display: "inline-grid"}}>
                <button>Edit</button> <br />
                <button>Purchase History</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
