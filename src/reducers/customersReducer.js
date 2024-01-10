const initialState = {
  customers: [],
};

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "init-customers":
      return { ...state, customers: action.payload.customersData };
    case "add-customer":
      return {
        ...state,
        customers: [...state.customers, action.payload.newCustomer],
      };
    default:
      return state;
  }
};

export default customersReducer;
