const Product = require("../models/productModel")

const createProduct = async (req,res)=>{
    try{
        const newProduct = {
            title:req.body.title,
            description:req.body.description,
            productImage:req.body.productImage,
            price:req.body.price,
            availability:req.body.availability
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