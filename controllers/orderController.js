const Order = require("../models/Order")

module.exports.CheckOut = async (req, res) => {
    try {
        if(req.verifiedUser.isAdmin){
            return res.json("unauthorized")
        }

        const newOrder = new Order({
            userId: req.params.id,
            address: req.body.address,
            orderCart: req.body.orderCart,
            orderPrice: req.body.orderPrice
        })

        await newOrder.save()
        return res.json(true)
    } catch (err) {
        console.log(err)
        return res.json(false)
    }


}