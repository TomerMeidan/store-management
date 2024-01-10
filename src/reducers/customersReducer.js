const initialState = {
  customersList: [],
};

const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "init-customers":
      return {
        ...state,
        customersList: [...state.customersList, action.payload.newCustomer],
      };
    default:
      return state;
  }
};

export default customersReducer;
