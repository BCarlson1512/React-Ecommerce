import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
    const productDetails = useSelector( state => state.productDetails);
    const productId = props.match.params._id;
    const [qty, setQty] = useState(1);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`); // changes the route 
    };
    return (
        <div>
            {loading ? <LoadingBox/>
            :
            error? <MessageBox variant="danger">{error}</MessageBox>
            : (
                <div>
                    <div className="product-return">
                        &lt;- <Link to='/'>Return to Products</Link>
                    </div>
                <div className="row top">
                        <div className="col-2">
                            <img className="large" src={product.image} alt={`Product display for ${product.name}`}/>
                        </div>
                    <div className="col-1">
                        <div className="productInfo">
                            <ul>
                                <li>
                                    <h4>{product.title}</h4>
                                </li>
                                <li>
                                    Price: <b>${product.price}</b>
                                </li>
                                <li>
                                    Description: 
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-1">
                        <div className= "card card-body">
                            <ul>
                                <li>
                                    <div className="price"> Price: {product.price} </div>
                                </li>
                                <li>
                                    <div>Status:</div>
                                    <div>
                                        <b>{product.countInStock>0? (<span className="success">In Stock</span>):
                                        (<span className="error">Unavailable</span>)
                                        }</b>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                    <div>
                                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map( 
                                                                (x) => ( 
                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button onClick={addToCartHandler} className="primary block" > Add to Cart </button>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}