import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
    const { product } = props; 
    return(
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img className ="image" src={product.image} alt="product" height="300" width="300"/>
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h2>{product.title}</h2>
                </Link>
            </div>
            <div className="price">
                $ {product.price}
            </div>
        </div>
    )
}