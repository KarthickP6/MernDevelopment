import {
  ADD_TO_CART,
  DELETE_TO_CART,
  FETCH_PRODUCTS,
  SHOW_TO_CART,
} from "./actionTypes"

export const fetch = (product) => {
  return {
    type: FETCH_PRODUCTS,
    payload: product,
  }
}

export const addToCart = (cartProduct) => {
  return {
    type: ADD_TO_CART,
    payload: cartProduct,
  }
}
export const showToCart = (cartProduct) => {
  return {
    type: SHOW_TO_CART,
    payload: cartProduct,
  }
}

export const deleteToCart = (cartProduct) => {
  return {
    type: DELETE_TO_CART,
    payload: cartProduct,
  }
}
