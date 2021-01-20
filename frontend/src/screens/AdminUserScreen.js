import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminUser, createRandomUser, deleteUser, listUsers } from '../actions/userActions';
import AdminDashboardMenu from '../components/AdminDashboardMenu';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DELETE_RESET } from '../constants/userConstants';

export default function AdminUserScreen(props) {
    const usersList = useSelector(state => state.usersList);
    const {loading, error, users} = usersList;
    
    const userDelete = useSelector(state => state.userDelete);
    const {loading: deleteLoad, error: deleteError, success: deleteSuccess} = userDelete;
    
    const userRegister = useSelector(state => state.userRegister);
    const {success: createSuccess} = userRegister;

    const dispatch = useDispatch();

    const deleteUserHandler = (user) => {
        if (window.confirm("Are you sure you want to delete user?")) {
            dispatch(deleteUser(user));
        }
    }

    const createAdminHandler = () => {
        //TODO: dispatch create admin
        dispatch(createAdminUser());
    }

    const createUserHandler = () => {
        //TODO: dispatch create user
        dispatch(createRandomUser());
    }

    const editUserDetailsHandler = (userId) => {
        //TODO: dispatch edit details, redirect to user page
        props.history.push('/profile');
    }

    useEffect(() => {
        dispatch(listUsers());
        if (deleteSuccess) {
            dispatch({type: USER_DELETE_RESET});
        }
    }, [dispatch, deleteSuccess, createSuccess])
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <AdminDashboardMenu/>
            </div>
            <div className="admin-content">
                <h1>Manage Users</h1>
                <p>TODO: Search for a specific user
                </p>
                {deleteLoad && <LoadingBox/>}
                {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
                {loading? (<LoadingBox/>)
                :error? (<MessageBox variant="danger">{error}</MessageBox>)
                :(
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
                                            <button type="button" className="small" onClick={() => deleteUserHandler(user)}> Delete User </button>
                                            <button type="button" className="small" onClick={() => editUserDetailsHandler(user._id)}> TODO: Edit User Details </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                )}
                <button className="primary" onClick={() => createAdminHandler()}>Create New Admin User</button>
                <button className="primary" onClick={() => createUserHandler()}>Create New User</button>
            </div>
        </div>
    );
}