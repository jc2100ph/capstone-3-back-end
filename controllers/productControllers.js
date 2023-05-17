const Product = require("../models/Product")

module.exports.productGetAll = async (req, res) => {
    try{
        const allProducts = await Product.find({})
        return res.json(allProducts)
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.productGetAllActive = async (req,res) => {
    try{
        const activeProducts = await Product.find({isActive: true})
        return res.json(activeProducts)
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const singleProduct = await Product.findById(productId);
        return res.json(singleProduct);
    } catch (err) {
        console.log(err);
        return res.json(false);
    }
}

module.exports.productCreate = async (req, res) => {
    if(!req.verifiedUser.isAdmin){
        return res.json("unauthorized")
    }

    try{
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            productType: req.body.productType,
            option: req.body.option,
            price: req.body.price,
            bannerPicUrl: req.body.bannerPicUrl
        })
        await newProduct.save()
        return res.json(true)
    }catch(err) {
        console.log(err)
        return res.json(false)
    }
}

module.exports.productUpdate = async (req, res) => {
    if (!req.verifiedUser.isAdmin) {
        return res.json("unauthorized");
    }

    try {
        const productId = req.params.id;
        const updateField = {
            name: req.body.name,
            description: req.body.description,
            option: req.body.option,
            price: req.body.price,
        };
        await Product.findByIdAndUpdate(productId, updateField);
        return res.json(true);
    } catch (err) {
        console.log(err);
        return res.json(false);
    }
}

module.exports.productArchive = async (req, res) => {
    if (!req.verifiedUser.isAdmin) {
        return res.json("unauthorized");
    }

    try {
        const productId = req.params.id;

        await Product.findByIdAndUpdate(productId, { isActive: false });
        return res.json(true);
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
}

module.exports.productActivate = async (req, res) => {
    if (!req.verifiedUser.isAdmin) {
        return res.json("unauthorized");
    }

    try {
        const productId = req.params.id;

        await Product.findByIdAndUpdate(productId, { isActive: true });
        return res.json(true);
    } catch (err) {
        console.log(err);
        return res.json(false);
    }
}