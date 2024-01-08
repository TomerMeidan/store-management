import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  }, []);

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
    </div>
  );
};

export default EditCustomer;
