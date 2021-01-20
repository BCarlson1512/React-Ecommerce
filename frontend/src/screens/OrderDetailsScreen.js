import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderDetailsScreen(props) {

    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, error: errorPay, success: successPay} = orderPay;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type="text/javascript";
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        
        if (!order || successPay || (order && order._id !== orderId)) { // if the order is undefined or payment is successful... fetch the order from the backend
            dispatch({type: ORDER_PAY_RESET});
            dispatch(detailsOrder(orderId));
        } else { // order data exists, so setup the paypal script
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    const successfulPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    return loading? (<LoadingBox/>) 
    : error? (<MessageBox variant="danger"/>)
    :(
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                                    <strong>Address:</strong> <br/>
                                    {order.shippingAddress.address}, <br />
                                    {' '}{order.shippingAddress.city}, {order.shippingAddress.province}, <br /> 
                                    {order.shippingAddress.country},<br />
                                    {order.shippingAddress.postalCode} <br />
                                    
                                </p>
                                {order.isDelivered? 
                                <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                                : <MessageBox variant="danger">Not Delivered</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment:</h2>
                                    <p>
                                        <strong>Payment Method:</strong>{order.paymentMethod}
                                    </p>
                                    {order.isPaid? <MessageBox variant="success">Paid on {order.paymentResult.update_time}</MessageBox>
                                    : <MessageBox variant="danger">Not Paid</MessageBox>
                                    }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Items Ordered</h2>
                                <ul>
                                    {order.orderItems.map((item) => (
                                        <li key={item.product}>
                                            <div className="row">
                                                <div>
                                                    <img src ={item.image} alt ={item.name} className="small"/>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {!order.isPaid && (
                                <li>
                                    {!sdkReady? (<LoadingBox/>)
                                    :(
                                        <>
                                        {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                        {loadingPay && (<LoadingBox/>)}
                                        <PayPalButton amount={order.totalPrice} onSuccess={successfulPaymentHandler}></PayPalButton>
                                        </>
                                        )
                                    }
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}