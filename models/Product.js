const mongoose = require("mongoose")

const optionSchema = mongoose.Schema({
    optionId: {type: Number,require: true},
    color: { type: String, required: true },
    hex: { type: String, required: true },
    pictureUrl: [{ link: { type: String, required: true } }]
})

const priceSchema = mongoose.Schema({
    priceId: {type: Number,require: true},
    size: { type: String, required: true },
    amount: { type: Number, required: true }
})

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    productType: { type: String, required: true },
    option: [optionSchema],
    price: [priceSchema],
    bannerPicUrl: {type: String, required: true},
    isActive: { type: Boolean, default: true },
    createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
