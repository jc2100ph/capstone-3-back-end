const mongoose = require("mongoose")

const orderProductSchema = mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    orderName: {type: String, required: true},
    orderPic: {type: String, required: true},
    orderPrice: {type: Number, required: true},
    orderQuantity: {type: Number, required: true},
    orderSize: {type: String, required: true},
    orderColor: {type: String, required: true}
})


const cartSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    userCart: {type: [orderProductSchema], default: []},
    totalPrice: {type: Number,default: 0, min: 0},
    createdOn: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, id: false });

cartSchema.pre("save", function(next) {
    let totalPrice = 0;
    for (let i = 0; i < this.userCart.length; i++) {
        totalPrice += this.userCart[i].orderPrice * this.userCart[i].orderQuantity;
    }
    this.totalPrice = totalPrice;
    next();
});



module.exports = mongoose.model("Cart", cartSchema)
