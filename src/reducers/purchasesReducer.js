const initialState = {
    totalPurchases: 0
  }
  
  const purchasesReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case "add-purchase":
        return{...state, totalPurchases: action.payload.totalPurchases}
      default:
        return state;

        
    }
  };
  
  export default purchasesReducer;
  