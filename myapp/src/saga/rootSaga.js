import { takeEvery, put, call, takeLatest, take } from "redux-saga/effects"
import Axios from "axios"
import {
  ADD_CART,
  ADD_TO_CART,
  FETCH,
  FETCH_PRODUCTS,
  REMOVE_CART,
  SHOW_CART,
  SHOW_TO_CART,
} from "../redux/actionTypes"
import { addToCart, fetch, showToCart } from "../redux/productActions"

export function* rootSaga() {
  console.log("Came")
  yield takeEvery(FETCH, fetchDetails)
  yield takeEvery(SHOW_CART, showDetails)
  yield takeEvery(ADD_CART, addCart)
  yield takeEvery(REMOVE_CART, removeCart)
}

function* removeCart(action) {
  const response = yield call(removeCartDetails, action.payload)

  const response1 = yield call(getCartDetails)
  yield put(showToCart(response1.data))
}

function removeCartDetails(authParams) {
  const url = "http://localhost:5000/cart/removeToCart"
  return Axios.request({ method: "DELETE", url: url, data: authParams })
}

function* addCart(action) {
  const response = yield call(addCartDetails, action.payload)

  yield put(addToCart(response.data))
}

function addCartDetails(authParams) {
  const url = "http://localhost:5000/cart/addToCart"
  return Axios.request({ method: "post", url: url, data: authParams })
}

function* showDetails() {
  const response = yield call(getCartDetails)
  yield put(showToCart(response.data))
}

function getCartDetails() {
  const url = "http://localhost:5000/cart/showToCart"
  return Axios.get(url)
}

function* fetchDetails() {
  const response = yield call(getData)
  yield put(fetch(response.data))
}
function getData() {
  const url = "http://localhost:5000/cart/"
  return Axios.get(url)
}
