const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports.createToken = (user) => {
    const payload = {
        email: user.email,
        isAdmin: user.isAdmin,
        userId: user._id
    }
    const secret = process.env.JWT_SECRET
    const option = { expiresIn: '30m' }

    return jwt.sign(payload, secret, option)
}

module.exports.verifyToken = (req, res, next) => {
    const secret = process.env.JWT_SECRET
    const token = req.cookies.token

    if(!token) {
        return res.json(false)
    }

    try{
        const decoded =  jwt.verify(token, secret)
        req.verifiedUser = decoded
        next()
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}