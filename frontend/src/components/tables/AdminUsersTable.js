import React from 'react';

export default function AdminUsersTable (props) {
    const { users } = props;
    return (
            <table className="table">
                <thead>
                    <tr>
                        <th> USER ID </th>
                        <th> NAME </th>
                        <th> EMAIL </th>
                        <th> ADMIN STATUS </th>
                        <th> DATE CREATED </th>
                        <th> LAST UPDATED </th>
                        <th> NUMBER OF ORDERS </th>
                        <th> TOTAL REVENUE </th>
                        <th> ACTIONS </th>
                    </tr>
                </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin? "Admin" : "Customer"}</td>
                                <td>{user.createdAt.substring(0,10)}</td>
                                <td>{user.updatedAt.substring(0,10)}</td>
                                <td>TODO: COUNT USER ORDERS</td>
                                <td> TODO: SUM USER'S TRANSACTION PRICES</td>
                                <td>
                                    <button type="button" className="small"> TODO: Delete User </button>
                                    <button type="button" className="small"> TODO: Edit User Details </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
            </table>
    )
}