import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {

    const buyingCustomers = useSelector((state) => state.purchasesReducer.buyingCustomers);
    const { productID, productName, productPrice, productQuantity } = useParams();
    const navigate = useNavigate();
    const [exitAddWindow, setExitAddWindow] = useState(false);
  
    const [name, setName] = useState(productName);
    const [price, setPrice] = useState(productPrice);
    const [quantity, setQuantity] = useState(productQuantity);

    return (
        <div style={{ border: "1px solid" }}>
          <div style={{ float: "right" }}>
            <button onClick={() => setExitAddWindow(true)}>X</button>
          </div>
          <br /> <br />
          <b>ID:</b> {productID} <br />
          <br />
          <b>Name:</b>{" "}
          <input
            type="text"
            defaultValue={name}
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
          <button>Save</button>
          <button>Delete</button>
          <br/><br/>
          <h3>List of Buying Customers</h3>
    
          {buyingCustomers.map((customer) => {
            return <div key={customer.costumerID}>
              <Link > {customer.name}</Link>
            </div>;
          })}
    
        </div>
      );
}

export default EditCustomer