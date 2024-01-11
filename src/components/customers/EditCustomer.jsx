import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import db from "../../utils/firebase";

// TODO Realtime change in the customer information

const EditCustomer = () => {
  const { customerID } = useParams();
  const navigate = useNavigate();
  const [exitAddWindow, setExitAddWindow] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    city: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (exitAddWindow) navigate("..");
  }, [exitAddWindow]);

  useEffect(() => {
    const getCustomer = async () => {
      const docRef = doc(db, "customers", customerID);

      try {
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setCustomerDetails({ ...docSnapshot.data() });
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    getCustomer();
    getCustomerProducts();
  }, []);

  const getCustomerProducts = () => {
    // Query the Purchases collection for purchases made by this customer
    const purchasesQuery = query(
      collection(db, "purchases"),
      where("customerID", "==", customerID)
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
        setProducts(productsData);
      });
    });
  };

  const handleUpdateCustomer = async () => {
    const docRef = doc(db, "customers", customerDetails.id);

    await updateDoc(docRef, {
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      city: customerDetails.city,
    }).then(console.log("Customer and references updated successfully"));
  };

  const handleDeleteProduct = async () => {
    const customerRef = doc(db, "customers", customerDetails.id);
    const purchasesRef = collection(db, "purchases");

    // Delete from products table
    await deleteDoc(customerRef).then(async () => {
      // Delete from purchases table by productID
      const querySnapshot = await getDocs(
        query(purchasesRef, where("customerID", "==", customerDetails.id))
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
      <h2>Edit customer</h2>
      <b>ID:</b> {customerDetails?.id} <br />
      <br />
      <b>First Name:</b>{" "}
      <input
        type="text"
        onChange={(e) => {
          setCustomerDetails((prev) => ({
            ...prev,
            firstName: e.target.value,
          }));
        }}
        defaultValue={`${customerDetails.firstName}`}
      />{" "}
      <br />
      <br />
      <b>Last Name:</b>{" "}
      <input
        type="text"
        onChange={(e) => {
          setCustomerDetails((prev) => ({ ...prev, lastName: e.target.value }));
        }}
        defaultValue={`${customerDetails.lastName}`}
      />{" "}
      <br />
      <br />
      <b>City:</b>{" "}
      <input
        type="text"
        onChange={(e) => {
          setCustomerDetails((prev) => ({ ...prev, city: e.target.value }));
        }}
        defaultValue={`${customerDetails.city}`}
      />{" "}
      <br />
      <br />
      <button onClick={handleUpdateCustomer}>Save</button>
      <button onClick={handleDeleteProduct}>Delete</button>
      <br />
      <br />
      <h2>List of bought products</h2>
      {products?.map((product) => {
        return (
          <div key={product.id}>
            <Link
              to={`/products/edit/${product.id}/${product.name}/${product.price}/${product.quantity}`}
            >
              {product.name}
            </Link>
          </div>
        );
      })}
      <br />
    </div>
  );
};

export default EditCustomer;
