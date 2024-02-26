const User = require('../models/user.model')
const UserDetails = require('../models/user.details.model')
const Product = require('../models/product.model')
const path = require('path')

// @desc Get all products
// @droute GET /products
// @access Private
const getAllProducts = async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().lean()

    // If no notes 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }

    // You could also do this with a for...of loop
    const productsWithUser = await Promise.all(products.map(async (product) => {
        const user = await User.findById(product.user).select('-password -_id').lean().exec()
        return {...product, ...user}
    }))

    res.json(productsWithUser)
}

const getProductById = async (req,res) => {
    console.log(req.params)
    const {id} = req.params
    console.log(id)
    const product = await Product.findById(id).lean().exec()
    const user = await User.findById(product.user).select('-password -_id').lean().exec()
    // if no product
    if(!product){
        return res.status(400).json({message: "Product not found"})
    }
    const productObj = {
        ...product, ...user
    }
    res.json(productObj)
}

const createNewProduct = async (req,res) => {
    const { user, name, description,
     price, tags, productProperties,
     productReservation, category} = req.body

    if(!user || !name || !description || !price || !category?.length ){
        return res.status(400).json({message: "All fields are required"})
    }

    // Create and store new product
    const product = await Product.create({user, name, description, price, category})


    if(product) { //Created
        return res.status(201).json({message: "New product created"})
    } else{
        return res.status(400).json({message: "Invalid product data received"})
    }
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getProductById
}