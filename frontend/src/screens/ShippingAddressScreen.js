import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/login');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [province, setProvince] = useState(shippingAddress.province);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country, province}));
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Details</h1>
                </div>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter Full Name" value={fullName} onChange={(e => setFullName(e.target.value))} required></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter Street Address" value={address} onChange={(e => setAddress(e.target.value))} required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter City" value={city} onChange={(e => setCity(e.target.value))} required></input>
                </div>
                <div>
                    <label htmlFor="province">Province</label>
                    <input type="text" id="province" placeholder="Enter Province" value={province} onChange={(e => setProvince(e.target.value))} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter Postal Code" value={postalCode} onChange={(e => setPostalCode(e.target.value))} required></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter Country" value={country} onChange={(e => setCountry(e.target.value))} required></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Proceed to Payment</button>
                </div>
            </form>
        </div>
    )
}