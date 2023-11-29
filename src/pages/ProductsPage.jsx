import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../utils/firebase";
import Product from "../components/Product";

const ProductsPage = () => {
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
      <div style={{ float: "left" }}>
        {
          // TODO Create Search option for a product
        }
        Search: <input/> <br /><br /> 
        {products?.map((product) => {
          return (
            <div key={product.id}>
              <div className="products">
                <Product product={product} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="total-box">
        {
          // TODO Total purchases here
          <>
            <h2>Total Purchases</h2>
            <h3>Here will be the sum of all purchases</h3>
            <h3>5550 NIS</h3>
          </>
        }
      </div>
    </div>
  );
};

export default ProductsPage;
