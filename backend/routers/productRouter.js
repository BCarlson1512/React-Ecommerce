import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})
);

productRouter.get('/seed', expressAsyncHandler(async(req,res) =>{
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
})
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
})
);

productRouter.put('/:id', expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.title = req.body.title;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.description = req.body.description;
        product.price = req.body.price;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        res.send({message: "Updated Product", product: updatedProduct});
    } else {
        res.status(404).send({message: "Product not found"});
    }
})
);

productRouter.delete('/:id', expressAsyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        const deleteProduct = await product.remove();
        res.send({message: "Product Deleted", product: deleteProduct});
    } else {
        res.status(404).send({message: "Product Not Found"});
    }
}));

productRouter.post('/', expressAsyncHandler(async(req,res) => {
    const product = new Product({
        title: 'product name' + Date.now(),
        image: '/images/web-us-hoodie.jpg',
        description: 'sample description',
        brand: 'sample brand',
        category: 'sample category',
        price: 0,
        countInStock: 0,
    });
    const createdProduct = await product.save();
    res.send({message: "created product", product: createdProduct});
}));

export default productRouter;