import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import AdminDashboardMenu from '../components/AdminDashboardMenu';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function AdminOrderScreen(props) {
    const ordersList = useSelector(state => state.ordersList);
    const {loading, error, orders} = ordersList;
    const dispatch = useDispatch();
    const orderDelete = useSelector(state => state.orderDelete);
    const  {loading: deleteLoading, error: deleteError, success: deleteSuccess} = orderDelete;
    const deleteOrderHandler = (order) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            dispatch(deleteOrder(order));
        }
    }
    useEffect(() => {
        dispatch(listOrders());
        if (deleteSuccess) {
            dispatch({type: ORDER_DELETE_RESET});
        }
    }, [dispatch, deleteSuccess])
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <AdminDashboardMenu/>
            </div>
            <div className="admin-content">
                <h1>Manage Orders</h1>
                <p>TODO: Search for order, Search by: id, userid, date, paymentstatus, deliverystats, delete order</p>
                {deleteLoading && <LoadingBox/>}
                {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
                {loading? <LoadingBox/> :
                error? <MessageBox variant="danger">{error}</MessageBox>
                :(
                    <table className="table">
                        <thead>
                            <tr>
                                <th> ORDER ID </th>
                                <th> USER ID </th>
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
                                        <td>{order.user}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid? 'Paid '+ order.paymentResult.update_time.substring(0,10): 'NOT PAID'}</td>
                                        <td>{order.isDelivered? order.deliveredOn.substring(0,10): 'NOT DELIVERED'}</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)}>Details</button>
                                            <button type="button" className="small">TODO EDIT ORDER</button>
                                            <button type="button" className="small" onClick={() => deleteOrderHandler(order)}>DELETE ORDER</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}