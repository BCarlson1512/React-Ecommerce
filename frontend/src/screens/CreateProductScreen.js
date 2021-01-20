import React, { useState } from 'react';

export default function CreateProductScreen() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const submitHandler = (e) => {
        
    }
    return (
        <div>
            <h1>Create New Product</h1>
            <form className="form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <input id="category" type="text" placeholder="Enter Name" value={category} onChange={(e) => setCategory(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input id="brand" type="text" placeholder="Enter Brand" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input id="description" type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input id="price" type="number" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" type="number" placeholder="Enter Stock" value={stock} onChange={(e) => setStock(e.target.value)}/>
                </div>
                <div>
                    <button className="primary" type="submit" onSubmit={submitHandler}> Submit Changes </button>
                </div>
            </form>
        </div>
    )
}