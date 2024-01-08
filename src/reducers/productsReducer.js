const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "init-products":
      return { ...state, products: action.payload.productsData };
    case "reduce-product-quantity":
      return {
        ...state,
        products: [
          state.products.map((product) => {
            if (product.id === action.payload.productID)
              return { ...product, quantity: product.quantity - 1 };
            return product;
          }),
        ],
      };
    default:
      return state;
  }
};

export default productsReducer;
