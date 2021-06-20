import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productReducer,
  newProductReducer,
  productDetailsReducer,
  newReviewsReducer
} from './reducers/productReducers';
import {
  authReducer,
  userReducer,
  forgotPasswordReducer
} from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  newOrderReducer,
  myOrdersReduer,
  orderDetailsReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReduer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewsReducer
});

let initialState = {
  cart: {
    // If there are items on the local storage then load them to the cart items array
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    // If there is shipping informtion on the local storage then load it to the shipping info
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {}
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
