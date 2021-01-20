import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import AdminDashboardMenu from '../components/AdminDashboardMenu';

export default function AdminDashboardScreen() {
    
    const ordersList = useSelector(state => state.ordersList);
    const {loading, error, orders} = ordersList;
    const dispatch = useDispatch();

    function getSales(orders) {
        var sales;
        orders.map((order) => (
            sales += order.totalPrice
        ));
        return sales; 
    }

    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch])
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <AdminDashboardMenu/>
            </div>
            <div className="admin-content">
                <h1>Store Dashboard</h1>
                <h2>TODO:</h2>
                <div className="admin-stats">
                    <h2>Product sales</h2>
                    <h2>User count</h2>
                    <h2>Total Sales Revenue</h2>
                </div>
                <div className="admin-stats graphs">
                    <h3>Pie chart for sales</h3>
                    <h3>Line graph for daily sales</h3>
                </div>
            </div>
        </div>
    )
}