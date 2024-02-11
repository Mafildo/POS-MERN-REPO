const initialState = {
  loading: false,
  cartItems: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "Update_cart":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "DeleteFromCart":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== action.payload._id)
      };
      case "DeleteFromCartBySNo":
      return {
        ...state,
        cartItems: state.cartItems.filter((item, index) => index !== action.payload - 1),
      };
    default:
      return state;
  }
};

export default rootReducer;
