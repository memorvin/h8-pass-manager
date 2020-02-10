import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import { thunk } from './middlewares'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

console.log(store.getState())

export default store;