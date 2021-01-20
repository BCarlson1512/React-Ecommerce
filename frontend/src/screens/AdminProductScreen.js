import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProducts, listProducts } from '../actions/productActions';
import AdminDashboardMenu from '../components/AdminDashboardMenu';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function AdminProductScreen(props) {
    const productList = useSelector(state=> state.productList);
    const {loading, error, products} = productList;
    const dispatch = useDispatch();
    const productDelete = useSelector(state => state.productDelete);
    const {loading: deleteLoading, error: deleteError, success: deleteSuccess} = productDelete;
    const productCreate = useSelector(state => state.productCreate);
    const {loading: createLoading, error: createError, success: createSuccess} = productCreate;
    useEffect(() => {
        dispatch(listProducts());
        if (deleteSuccess) {
            dispatch({type: PRODUCT_DELETE_RESET});
        }
        if (createSuccess) {
            dispatch({type: PRODUCT_CREATE_RESET});
        }
    },[dispatch, deleteSuccess, createSuccess]);
    const deleteProductHandler = (product) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProducts(product));
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct());
    }
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <AdminDashboardMenu/>
            </div>
            <div className="admin-content">
                <h1>Manage Products</h1>
                {deleteLoading && <LoadingBox/>}
                {deleteError && <MessageBox variant="danger">{deleteError}</MessageBox>}
                {createLoading && <LoadingBox/>}
                {createError && <MessageBox variant="danger">{createError}</MessageBox>}
                {loading? (<LoadingBox/>)
                :error? (<MessageBox variant="danger">{error}</MessageBox>)
                : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th> PRODUCT ID </th>
                                <th> NAME </th>
                                <th> PRICE </th>
                                <th> STOCK LEVEL </th>
                                <th> CREATED ON </th>
                                <th> LAST UPDATED </th>
                                <th> ACTIONS </th>
                                    </tr>
                                </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.price.toFixed(2)}</td>
                                        <td>{product.countInStock}</td>
                                        <td>{product.createdAt.substring(0,10)}</td>
                                        <td>{product.updatedAt.substring(0,10)}</td>
                                        <td>
                                            <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>EDIT</button>
                                            <button type="button" className="small" onClick={() => deleteProductHandler(product)}>DELETE PRODUCT </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                    </table>
                )}
                <div>
                    <button className="block primary" onClick={() => createProductHandler()}>Create New Product</button>
                </div>
            </div>
        </div>
    );
}