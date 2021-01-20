import Axios from "axios";
import { PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST,  
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_UPDATE_FAIL, 
    PRODUCT_UPDATE_REQUEST, 
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,  } from "../constants/productConstants"

// gets the list of products from the backend
export const listProducts = () => async(dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try {
        const { data } = await Axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

// this gets the product details from the backend
export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data}); // data found... cool lets like... send it back to the client
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, // if it fucks up... make sure theres a message for said fuck up
            payload: 
            error.response && error.response.data.message ?
            error.response.data.message : error.message
        });
    }
}

export const updateProducts = (product) => async(dispatch) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST, payload: product});
    try {
        const { data } = Axios.put(`/api/products/${product._id}`, product);
        dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message 
        : error.message;
        dispatch({type: PRODUCT_UPDATE_FAIL, payload: message});
    }
}

export const deleteProducts = (product) => async(dispatch) => {
    dispatch({type: PRODUCT_DELETE_REQUEST});
    try {
        const { data } = Axios.delete(`/api/products/${product._id}`, product);
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message 
        : error.message;
        dispatch({type: PRODUCT_DELETE_FAIL, payload: message});
    }
}

export const createProduct = () => async(dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST});
    try {
        const { data } = Axios.post('/api/products', {});
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message 
        : error.message;
        dispatch({type: PRODUCT_CREATE_FAIL, payload: message});
    }
}
