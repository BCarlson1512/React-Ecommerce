import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            dispatch(register(name, email, password));
        }
    }

    useEffect (() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    console.log(userInfo);
    return(
        <div className="loginWrapper">
            {loading && <LoadingBox/>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <form className="form" onSubmit={submitHandler}>
                <div className="logo">
                    <img className ="medium" src="./images/BlueLogo.png" alt="Web Us Logo" />
                    <h1>Client Registration</h1>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter name" required  onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required  onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Password</label>
                    <input type="password" id="password" placeholder="Confirm Password" required onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit"> Create Account </button>
                </div>
                <div>
                    <label />
                    <div>
                        Have an account already? { ' ' }
                        <Link to={`/login?redirect=${redirect}`}>Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}