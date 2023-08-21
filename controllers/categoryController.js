const Category = require("../models/categoryModel")

const createCategory = async (req , res)=>{
    try{
        const newCategory = {
            name:req.body.name
        }
        await Category.create(newCategory)
        res.json("Category successfully created")
    }catch(err){
        console.log(err)
    }
}

const getCategory = async (req,res)=>{
    try{
        const Categories = await Category.find()
        res.json(Categories)
    }catch(err){
        console.log(err)
    }
}

module.exports =  {createCategory, getCategory}