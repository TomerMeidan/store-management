import { useEffect, useState } from "react";
import { Combobox, DatePicker } from "react-widgets";
import { useSelector } from "react-redux";
import PurchaseTable from "../components/purchases/PurchaseTable";

const PurchasesPage = () => {
  // Redux
  const allCustomers = useSelector((state) => state.customersReducer.customers);
  const allProducts = useSelector((state) => state.productsReducer.products);
  const allPurchases = useSelector(
    (state) => state.purchasesReducer.purchasedProducts
  );

  // useState objects
  const [customersWithFullNames, setCustomersWithFullNames] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [searchPress, setSearchPress] = useState(false);
  const [searchResult, setSearchResult] = useState();

  useEffect(() => {
    const newCustomers = allCustomers.map((customer) => ({
      ...customer,
      fullName: `${customer.firstName} ${customer.lastName}`,
    }));

    setCustomersWithFullNames(newCustomers);
  }, [allCustomers]);

  const handleDateChange = (newDate) => {
    const formattedDate = `${newDate.getDate().toString().padStart(2, "0")}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${newDate.getFullYear()}`;
    setSelectedDate(formattedDate);
  };

  const compareDates = (date) => {
    if (!selectedDate) return true;

    const dateRequest = date.split("/");
    const dateCompare = selectedDate?.split("/");

    const reqValue = dateRequest.map(Number);
    const selectedValue = dateCompare?.map(Number);

    return (
      reqValue[0] === selectedValue[0] &&
      reqValue[1] === selectedValue[1] &&
      reqValue[2] === selectedValue[2]
    );
  };

  useEffect(() => {

    const combinedData = allPurchases.map((purchase) => {
      if (!compareDates(purchase.date)) return;
      const customer = selectedCustomer
        ? selectedCustomer.id === purchase.customerID
          ? selectedCustomer
          : null
        : allCustomers.find((customer) => customer.id === purchase.customerID);

      const product = selectedProduct
        ? selectedProduct.id === purchase.productID
          ? selectedProduct
          : null
        : allProducts.find((product) => product.id === purchase.productID);
      if (customer && product)
        return {
          ...purchase,
          customerName: customer
            ? customer.firstName + " " + customer.lastName
            : "Null",
          productName: product ? product.name : "Null",
        };
    });

    let filteredCombinedData = combinedData.filter(
      (item) => item !== undefined
    );

    setSearchResult(filteredCombinedData);
  }, [searchPress]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div className="purchases-combo-box">
          Select Product:{" "}
          <Combobox
            data={allProducts}
            defaultValue={""}
            dataKey={"id"}
            textField="name"
            onChange={(value) => setSelectedProduct(value)}
          />
        </div>
        <div className="purchases-combo-box">
          Select Customer:
          <Combobox
            data={customersWithFullNames}
            defaultValue={""}
            dataKey={"id"}
            textField="fullName"
            onChange={(value) => setSelectedCustomer(value)}
          />
        </div>
        <div className="purchases-combo-box">
          Select Date:{" "}
          <DatePicker
            valueEditFormat={{ dateStyle: "short" }}
            max={new Date()}
            valueDisplayFormat={{ dateStyle: "medium" }}
            onChange={(value) => handleDateChange(value)}
          />
        </div>
        <div className="purchases-combo-box">
          <button
            style={{ marginTop: "20px" }}
            onClick={() => setSearchPress(!searchPress)}
          >
            Search
          </button>
        </div>
      </div>
      <br/>
      <PurchaseTable searchResultData={searchResult} />
    </div>
  );
};

export default PurchasesPage;
