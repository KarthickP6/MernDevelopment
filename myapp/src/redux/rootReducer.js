const { combineReducers } = require("redux")
const { productsReducer } = require("./productReducer")

export const rootReducer = combineReducers({
  productReducer: productsReducer,
})
