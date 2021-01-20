import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utilities.js';

const userRouter = express.Router();

// create api for users
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
})
);

userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
}));

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid email/password'});
})
);

userRouter.post('/register', expressAsyncHandler(async(req, res)=>{
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser),
    });
})
);

userRouter.get('/:id', expressAsyncHandler(async(req, res) =>{
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({message: "User not found"})
    }
}));

userRouter.delete("/:id", expressAsyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const deleteUser = await user.remove();
        res.send({message: "User Successfully Removed", user: deleteUser});
    } else {
        res.status(404).send({message: "User Not Found"});
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}));

userRouter.post('/registeradmin', expressAsyncHandler(async(req, res)=>{
    const admin = new User({
        name: req.body.name, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: true,
    });
    const createdAdmin = await admin.save();
    res.send({
        _id: createdAdmin._id,
        name: createdAdmin.name,
        email: createdAdmin.email,
        isAdmin: createdAdmin.isAdmin,
        token: generateToken(createdAdmin),
    });
})
);


export default userRouter;