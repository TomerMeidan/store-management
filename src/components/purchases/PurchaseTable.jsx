/* eslint-disable react/prop-types */
import React from "react";
import { v4 as uuidv4 } from "uuid";

const PurchaseTable = ({ searchResultData }) => {
  return (
    <table style={{ margin: "0 auto" }}>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Product Name</th>
          <th>Purchase Date</th>
        </tr>
      </thead>
      <tbody>
        {searchResultData?.map((resultRow) => {
          return (
            <tr key={uuidv4()}>
              <th>{resultRow.customerName}</th>
              <th>{resultRow.productName}</th>
              <th>{resultRow.date}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PurchaseTable;
