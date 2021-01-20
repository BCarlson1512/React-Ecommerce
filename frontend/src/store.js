import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { deleteOrderReducer, orderCreateReducer, orderDetailsReducer, orderListMineReducer, orderPayReducer, ordersListReducer } from './reducers/orderReducers';
import { createProductReducer, deleteProductReducer, detailsProductReducer, productDetailsReducer, productListReducer, updateProductReducer} from './reducers/productReducers';
import { deleteUserReducer, userDetailsReducer, userRegisterReducer, userSigninReducer, usersListReducer, userUpdateProfileReducer } from './reducers/userReducers';

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingAddress: localStorage.getItem('shippingAddress') 
        ? JSON.parse(localStorage.getItem('shippingAddress')) 
        : {},
        paymentMethod: 'PayPal',
    },
    userSignin : {
        userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
    },
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    detailProduct : detailsProductReducer,
    updateProduct : updateProductReducer,
    productDelete : deleteProductReducer,
    productCreate : createProductReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList : orderListMineReducer,
    ordersList : ordersListReducer,
    orderDelete : deleteOrderReducer,
    userDetails: userDetailsReducer,
    updateUserProfile: userUpdateProfileReducer,
    usersList : usersListReducer,
    userDelete: deleteUserReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))); // creates store for the reducer and init state

export default store;