const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    address: {type: String, required: true},
    orderCart: [{type: String, required: true}],
    orderPrice: {type: Number,default: 0, min: 0, required: true},
    createdOn: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Order", orderSchema)