import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/PrivateRoute';
import AdminDashboardScreen from './screens/AdminDashboard';
import AdminOrderScreen from './screens/AdminOrdersScreen';
import AdminProductScreen from './screens/AdminProductScreen';
import AdminUserScreen from './screens/AdminUserScreen';
import CartScreen from './screens/CartScreen';
import CreateProductScreen from './screens/CreateProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart; 
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
              <header className="row">
                  <div>
                      <Link to="/" className="brand">Your Ecommerce Site!</Link>
                  </div>
                  <div>
                      <Link to="/cart">Cart 
                      {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                      )}
                      </Link>
                      {
                        userInfo ? (
                          <div className="dropdown"> 
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                              <li>
                                <Link to="/profile">Your Profile</Link>
                              </li>
                              <li>
                                <Link to="/orderhistory">Order History</Link>
                              </li>
                              <Link to="#signout" onClick={signoutHandler}>Log out</Link>
                            </ul>
                          </div>
                          
                        ) : (
                          <Link to="/login">Login</Link>
                        )
                      }
                      {userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                          <Link to="#admin">Admin Options {' '}<i className="fa fa-caret-down"></i></Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                              <Link to="/productlist">Products</Link>
                            </li>
                            <li>
                              <Link to="/userlist">Users</Link>
                            </li>
                            <li>
                              <Link to="/orderlist">Orders</Link>
                            </li>
                          </ul>
                        </div>
                      )}
                  </div>
              </header>
              <main>
                <Route path="/cart/:_id?" component={CartScreen}/>
                <Route path="/product/:_id" component={ProductScreen}/>
                <Route path="/product/:id/edit" component={EditProductScreen}/>
                <Route path="/login" component={LoginScreen}/>
                <Route path='/register' component={RegisterScreen}/>
                <Route path='/shipping' component={ShippingAddressScreen}/>
                <Route path='/payment' component={PaymentScreen}/>
                <Route path='/placeorder' component={PlaceOrderScreen}/>
                <Route path='/order/:id' component={OrderDetailsScreen}/>
                <Route path='/orderhistory' component={OrderHistoryScreen}/>
                <AdminRoute path='/product/create' component={CreateProductScreen}/>
                <PrivateRoute path='/profile' component={ProfileScreen}/>
                <AdminRoute path='/dashboard' component={AdminDashboardScreen}/>
                <AdminRoute path='/userlist' component={AdminUserScreen}/>
                <AdminRoute path='/orderlist' component={AdminOrderScreen}/>
                <AdminRoute path='/productlist' component={AdminProductScreen}/>
                <Route path="/" component={HomeScreen} exact/>
              </main>
              <footer className="row center">
                      Copyright 2020 Web Us All Rights Reserved
              </footer>
          </div>
    </BrowserRouter>
  );
}

export default App;
