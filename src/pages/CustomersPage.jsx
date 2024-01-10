import { collection, getDocs, query, where } from "@firebase/firestore";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import db from "../utils/firebase";
import Customer from "../components/customers/Customer";

const CustomersPage = () => {
  const customers = useSelector((state) => state.customersReducer.customers);
  const location = useLocation();

  return (
    <div>
      <table style={{ float: "left" }}>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="city">City</th>
            <th id="productsList">List of Bought Products</th>
            <th id="action">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => {
            return <Customer key={customer.id} customer={customer} />;
          })}
        </tbody>
      </table>
      <div className="customers-page-outlet-box">
        <Outlet key={location.pathname} />
      </div>
    </div>
  );
};

export default CustomersPage;
