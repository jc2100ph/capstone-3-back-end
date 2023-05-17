const bcrypt = require("bcrypt")

const User = require("../models/User")
const Cart = require("../models/Cart")
const auth = require("../authentication/auth")



module.exports.register = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        })
        const newCart = new Cart({
            userId: newUser._id, 
        });
        await newUser.save()
        await newCart.save()
        return res.json(true)
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.login = async (req, res) => {
    try{
        const findUser = await User.findOne({email: req.body.email})

        if(!findUser){
            return res.json(false)
        }

        const comparePassword = await bcrypt.compare(req.body.password, findUser.password)

        if(!comparePassword){
            return res.json(false)
        }

        const generateToken = auth.createToken(findUser)
        res.cookie("token", generateToken, {httpOnly: true})
        return res.json(true)
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.cookie("token", '', { expires: new Date(0), httpOnly: true })
        return res.json(true)
    } catch (err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.checkEmail = async (req, res) => {
    try{
        const findEmail = await User.findOne({email: req.body.email})

        if(findEmail){
            return res.json(true)
        }else{
            return res.json(false)
        }

    }catch(err) {
        console.log(err)
        return res.json(false)
    }
} 

module.exports.retrieveUser = async (req,res) => {
    try {
        const userDetails = await User.findById(req.params.id) 
        return res.json(userDetails)
    } catch (err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.checkUser = async (req, res) => {
    try {
        if (req.verifiedUser.isAdmin) {
            return res.json({
                role: "admin",
                _id: req.verifiedUser.userId
            });
        }

        if (!req.verifiedUser.isAdmin) {
            return res.json({
                role: "user",
                _id: req.verifiedUser.userId
            });
        }
    } catch (err) {
        console.log(err);
        return res.json(false);
    }
};

module.exports.addToCart = async (req, res) => {
    try{
        if(req.verifiedUser.isAdmin){
            return res.json("unauthorized")
        }

        const findCart = await Cart.findOne({userId: req.verifiedUser.userId})

        findCart.userCart.push({
            productId: req.body.productId,
            orderName: req.body.orderName,
            orderPic: req.body.orderPic,
            orderPrice: req.body.orderPrice,
            orderQuantity: req.body.orderQuantity,
            orderSize: req.body.orderSize,
            orderColor: req.body.orderColor
        })

        await findCart.save();

        return res.json(true);
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.showUserCart = async (req,res) => {
    try {
        const userCart = await Cart.findOne({ userId: req.params.id }).exec();
        return res.json(userCart);
    } catch (err) {
        console.log(err)
        return res.json(false)
    }
}