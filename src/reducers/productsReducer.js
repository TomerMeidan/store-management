const initialState = {
  products: [],
}

const productsReducer = (state = initialState, action) => {

  switch (action.type) {
    case "init-products":
      return {...state, products: action.payload.productsData}
    default:
      return state;
  }
};

export default productsReducer;
