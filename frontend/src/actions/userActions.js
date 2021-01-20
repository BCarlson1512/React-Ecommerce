import Axios from "axios";
import {USER_SIGNIN_FAIL, 
        USER_SIGNIN_REQUEST, 
        USER_SIGNOUT, 
        USER_SIGNIN_SUCCESS, 
        USER_REGISTER_REQUEST, 
        USER_REGISTER_SUCCESS, 
        USER_REGISTER_FAIL, 
        USER_DETAILS_REQUEST, 
        USER_DETAILS_SUCCESS, 
        USER_DETAILS_FAIL, 
        USER_UPDATE_PROFILE_REQUEST, 
        USER_UPDATE_PROFILE_SUCCESS, 
        USER_UPDATE_PROFILE_FAIL, 
        USER_LIST_FAIL, 
        USER_LIST_SUCCESS, 
        USER_LIST_REQUEST,
        USER_DELETE_REQUEST,
        USER_DELETE_SUCCESS,
        USER_DELETE_FAIL, } from "../constants/userConstants"

export const register = (name, email, password) => async(dispatch) => {
        dispatch({type: USER_REGISTER_REQUEST, payload: {email, password}});
        try {
            const {data} = await Axios.post('/api/users/register', {name, email, password});
            dispatch({type: USER_REGISTER_SUCCESS , payload: data});
            dispatch({type: USER_SIGNIN_SUCCESS , payload: data});
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({type: USER_REGISTER_FAIL, payload: 
                error.response && error.response.data.message 
                ?error.response.data.message 
                : error.message,
            });
        }
}

export const signin = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await Axios.post('/api/users/login', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS , payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: 
            error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message,
        });
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_SIGNOUT});
}

export const detailsUser = (userId) => async (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST , payload: userId});
    const {userSignin:{userInfo}} = getState();
    try {
        const { data } = await Axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message 
        ?error.response.data.message 
        : error.message;
        dispatch({type: USER_DETAILS_FAIL, payload: message});
    }
};

export const updateUserProfile = (user) => async(dispatch, getState) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const {userSignin:{userInfo}} = getState(); 
    try {
        const { data } = await Axios.put('/api/users/profile', user, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message 
        ?error.response.data.message 
        : error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message})
    }
}

export const listUsers = () => async(dispatch) => {
    dispatch({type: USER_LIST_REQUEST});
    try {
        const { data } = await Axios.get('/api/users');
        dispatch({type: USER_LIST_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message 
        : error.message;
        dispatch({type: USER_LIST_FAIL, payload: message});
    }
}

export const deleteUser = (user) => async(dispatch) => {
    dispatch({type: USER_DELETE_REQUEST});
    try {
        const { data } = Axios.delete(`/api/users/${user._id}`, user);
        dispatch({type: USER_DELETE_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message?
        error.response.data.message 
        : error.message;
        dispatch({type: USER_DELETE_FAIL, payload: message});
    }
}

export const createAdminUser = () => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST});
    const randomNum = Math.floor(Math.random() * 100) +1;
    const name = `Admin${randomNum}`;
    const email = `sample${randomNum}@admin.com`;
    const password = '5678';
    const isAdmin = true;
    try {
        const {data} = await Axios.post('/api/users/registeradmin', {name, email, password, isAdmin});
        dispatch({type: USER_REGISTER_SUCCESS , payload: data});
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: 
            error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message,
        });
    }
}

export const createRandomUser = () => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST});
    const randomNum = Math.floor(Math.random() * 100) +1;
    const name = `customer${randomNum}`;
    const email = `sample${randomNum}@customer.com`;
    const password = '5678';
    const isAdmin = false;
    try {
        const {data} = await Axios.post('/api/users/registerrandom', {name, email, password, isAdmin});
        dispatch({type: USER_REGISTER_SUCCESS , payload: data});
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: 
            error.response && error.response.data.message 
            ?error.response.data.message 
            : error.message,
        });
    }
}