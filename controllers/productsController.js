const Product = require("../models/productModel")
const Category = require("../models/categoryModel")
const createProduct = async (req,res)=>{
    const {title, description, productImage, price, cat, availability} = req.body
    const getCategory = await Category.find({name:cat})
    try{
        const newProduct = {
            title,
            description,
            productImage,
            price,
            category:getCategory._id,
            availability
        }
        await Product.create(newProduct)
        res.json("product successfully created")
    }catch(err){
        console.log(err)
    }
}

const getProduct = async (req,res)=>{
    try{
        const products = await Product.find()
        res.json(products)
    }catch(err){
        console.log(err)
    }
}

module.exports =  {createProduct, getProduct}