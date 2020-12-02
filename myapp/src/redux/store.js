import CreateSagaMiddleware from "redux-saga"
import { rootSaga } from "../saga/rootSaga"
const { createStore, applyMiddleware } = require("redux")
const { rootReducer } = require("./rootReducer")

const sagaMiddleware = CreateSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
