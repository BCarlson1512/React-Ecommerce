import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import { updateProducts } from '../actions/productActions';

export default function EditProductScreen(props) {
    
    const productId = props.match.params.id;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product} = productDetails;

    const updateProduct = useSelector((state) => state.updateProduct);
    const { loading: loadingUpdate, error: updateError, success: updateSuccess} = updateProduct;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(countInStock);
        dispatch(updateProducts({
            _id: productId,
            title,
            category,
            brand,
            description,
            price,
            countInStock,
        }));
    }

    useEffect (() => {
        if (updateSuccess) {
            props.history.push('/productlist');
        }
        if (!product || product._id !== productId || updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        } else {
            setTitle(product.title);
            setDescription(product.description);
            setBrand(product.brand);
            setCategory(product.category);
            setPrice(product.price);
            setCountInStock(product.countInStock);
        }
    }, [dispatch, product, productId, props.history, updateSuccess]);
    return(
        <div className="editProductWrapper">
            {loadingUpdate && <LoadingBox/>}
            {updateError && <MessageBox variant="danger">{error}</MessageBox>}
            {loading? (<LoadingBox/>)
            :error? (<MessageBox variant="danger">{error}</MessageBox>)
            :(
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1> Update Product Details </h1>
                </div>
                <div>
                    <label htmlFor="title">Product Name</label>
                    <input id="title" type="text" placeholder="Enter Name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="brand">Product Brand</label>
                    <input id="brand" type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Product Category</label>
                    <input id="category" type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">Product Description</label>
                    <input id="description" type="text" placeholder="Enter Name" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price">Product Price</label>
                    <input id="price" type="text" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="countInStock">Product Stock</label>
                    <input id="countInStock" type="text" placeholder="Enter Stock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}/>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="button" onClick={submitHandler}>
                        Update Product Info
                    </button>
                </div>
            </form>
            )}
            
        </div>
    )
}