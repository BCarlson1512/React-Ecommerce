import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const adminRouter = express.Router();

adminRouter.post('/register', expressAsyncHandler(async(req, res)=>{
    const user = new User({
        name: req.body.name, 
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: true,
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

export default adminRouter;