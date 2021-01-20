import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const {loading, error, orders} = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch])
    return (
        <div>
            <h1>Your Orders</h1>
            {loading? <LoadingBox/> :
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> DATE </th>
                            <th> TOTAL </th>
                            <th> PAYMENT STATUS </th>
                            <th> DELIVERY STATUS </th>
                            <th> ACTIONS </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? 'Paid '+ order.paymentResult.update_time.substring(0,10): 'NOT PAID'}</td>
                                <td>{order.isDelivered? order.deliveredOn.substring(0,10): 'NOT DELIVERED'}</td>
                                <td>
                                    <button type="button" className="small"
                                        onClick={() => props.history.push(`/order/${order._id}`)}>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
        </div>
        
    )
}