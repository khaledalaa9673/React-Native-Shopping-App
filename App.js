import React from 'react';
import { createStore, combineReducers ,applyMiddleware} from 'redux';
import { Provider } from 'react-redux'; 
import cartReducer from "./store/reducers/cart"
import productsReducer from './store/reducers/products';
import orderReducer from "./store/reducers/orders"
import thunk from "redux-thunk"
import auth from "./store/reducers/auth"
import NavigationContainer from './navigation/NavigationContainer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart:cartReducer,
  orders:orderReducer,
  auth:auth
});


const store = createStore(rootReducer,applyMiddleware(thunk));
 
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
