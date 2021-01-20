import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import adminRouter from './routers/adminRouter.js';

dotenv.config();

const app = express(); // create new backend app that uses express
app.use(express.json()); // json parser for http requests
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/react_ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

//create an api for the database (Currently using mongoDB)
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/admin', adminRouter)
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get("/", (req, res) => {
    res.send('Server is ready');
});
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on https://localhost:${port}`);
});

