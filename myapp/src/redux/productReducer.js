import { ADD_TO_CART, FETCH_PRODUCTS, SHOW_TO_CART } from "./actionTypes"

const initialState = {
  products: [],
  cartProducts: [],
}
export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      }
    }
    case SHOW_TO_CART:
      return {
        ...state,
        cartProducts: action.payload,
      }
    case ADD_TO_CART:
      return {
        ...state,
        cartProducts: action.payload,
      }

    default:
      return state
  }
}
