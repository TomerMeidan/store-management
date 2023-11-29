/* eslint-disable react/prop-types */
const Product = ({ product }) => {
  return (
    <div>
      <div>
        Name: {product.name} <br />
        Price: {product.price} <br />
        Quantity: {product.quantity}
      </div>{" "}
      <br />
      <div>
        <button style={{ width: "100%", marginBottom: "5px" }}>Edit</button>{" "}
        <br />
        <button>Purchase History</button>
      </div>
    </div>
  );
};

export default Product;
