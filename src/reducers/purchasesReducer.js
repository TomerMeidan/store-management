const initialState = {
    totalPurchases: 0,
    purchasedProducts: [], 
    buyingCustomers: [],
  }
  
  const purchasesReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case "add-purchase":
        return{...state, totalPurchases: action.payload.totalPurchases}
      case "set-purchased-products":
        return{...state, purchasedProducts: action.payload.purchasedProduct}
      case "set-purchasing-customers":
        return{...state, buyingCustomers: action.payload.buyingCustomers}
      default:
        return state;

        
    }
  };
  
  export default purchasesReducer;
  