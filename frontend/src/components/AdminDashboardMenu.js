import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboardMenu() {
    return (
        <div className="admindashboard-sidebar">
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/userlist">Users</Link>
                </li>
                <li>
                    <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                    <Link to="/productlist">Products</Link>
                </li>
            </ul>
        </div>
    )
}