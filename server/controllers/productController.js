const User = require('../models/user.model')
const UserDetails = require('../models/user.details.model')
const Product = require('../models/product.model')
const path = require('path')
const { format } = require('date-fns')
const { logEvents } = require('../middleware/logger')

// @desc Get all products
// @droute GET /product
// @access Private
const getAllProducts = async (req, res) => {
    // Get all products from MongoDB
    const products = await Product.find().populate('user', "email firstName lastName").lean().exec();
    // If no products 
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }

    const productsWithUser = await Promise.all(products.map(async (product) => {
        // const user = await User.findById(product.user).select('-password -_id').lean().exec()
        const userDetails = await UserDetails.findOne({user: product.user}).select('-user -imageBackgroundPage -description -workSchedule -companyName -_id ').lean().exec()
        // const userObj = {user, userDetails}
        return {...product, ...userDetails}
    }))

    res.json(productsWithUser)
}

// @desc Get product by id
// @droute GET /product/:id
// @access Private
const getProductById = async (req,res) => {
    console.log(req.params)
    const {id} = req.params
    console.log(id)
    const product = await Product.findById(id).lean().exec()
    // if no product
    if(!product){
        return res.status(400).json({message: "Product not found"})
    }
    const user = await User.findById(product.user).select('-password -_id').lean().exec()
  
    const productObj = {
        ...product, ...user
    }
    res.json(productObj)
}

// @desc Create new product
// @droute POST /product
// @access Private
const createNewProduct = async (req,res) => {
    const { user, name, description,
     price, tags, productProperties,
     productReservation, category, productRegion } = req.body

    if(!user || !name || !description || !price || !category?.length ){
        return res.status(400).json({message: "All fields are required"})
    }

    const userDetails = await UserDetails.findOne({user: user}).exec()
    if(!userDetails.region?.city && !productRegion){
        return res.status(400).json({message: "No information is provided about the product's sales region. Please provide this data in your profile or directly in product"})
    }

    // Create and store new product
    const product = await Product.create({user, name, description, price, category, productRegion})


    if(product) { //Created
        return res.status(201).json({message: "New product created"})
    } else{
        return res.status(400).json({message: "Invalid product data received"})
    }
}

// @desc Update product by id
// @droute PATCH /product/:id
// @access Private
const updateProduct = async (req,res) => {
    const {id} = req.params
    const { 
        price,
        name, 
        description,
        quantity,
        productProperties,
        currency,
        deliveryOption,
        tags,
        active,
        productRegion,
        category,
        modifiedAt, 
    } = req.body
    
    //Does product exists
    console.log(req.params)
    const product = await Product.findById(id).select('-productReservation').exec()
    console.log(product)
    if(!product){
        return res.status(400).json({message: 'Product not found'})
    }
        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.quantity = quantity || product.quantity
        product.productProperties = productProperties || product.productProperties
        product.deliveryOption = deliveryOption || product.deliveryOption
        product.tags = tags || product.tags
        product.active = active || product.active
        product.productRegion = productRegion || product.productRegion
        product.category = category || product.category
    const productUpdated = await product.save()
    res.json({message: `Product ID: ${productUpdated._id} updated`})
}


// @desc Change product reservation, if product is not reserved
// @droute PATCH /reservation/:id
// @access Private
const changeProductReservation = async (req,res) => {
    const { id } = req.params
    const { user_id } = req.body
    console.log(req.params)
    // Does product exists
    const product = await Product.findById(id).select('productReservation _id').exec()
    if(!product){
        return res.status(400).json({message: "Product not found"})
    }

    if(product.productReservation.userId){
        return res.status(400).json({message: `Product is already reserved by user ${product.productReservation.userId}, reservation to: ${format(product.productReservation.reservationEndDate, 'dd/MM/yyyy HH:mm:ss')}`})
    }
    const date = new Date()
    product.productReservation = {
        userId: user_id,
        reservationStartDate: new Date(),
        reservationEndDate: new Date(+new Date() + 7*24*60*60*1000) 
    }

    const updatedProduct = await product.save()
    res.json({message: `Product ${updatedProduct._id} reserved successfully`})
}


// @desc List products with old reservation and remove reservation
// @droute GET /reservation
// @access Private
const checkReservationDate = async (req,res) => {
    const products = await Product.find({
        "productReservation": {
            $exists: true,
        },
        "productReservation.reservationEndDate": {
            $lte: new Date()
        }
    }).select('productReservation _id').lean().exec();

    let recordDeleted = false
    for (const product of products){
        try{
            // await Product.findByIdAndDelete(product._id)
            await Product.updateMany(
                { "_id": { $in: product._id} },
                { $unset: { "productReservation": 1} }
            )
            recordDeleted = true
            logEvents(`Record with ID: ${product._id} deleted\t EndDate: ${product.reservationEndDate}\t TodayDate: ${new Date()}`, 'reservationsLog.log')
        }catch(err){
            res.status(400).json({message: `Delete record error. Err code: ${err}`})
        }
    }
    
    if(recordDeleted){
        return res.status(200).json({message: 'Old reservation records deleted'})
    }else{
        return res.json({message: 'Old records not found'})
    }
    
}

module.exports = {
    getAllProducts,
    createNewProduct,
    getProductById,
    updateProduct,
    changeProductReservation,
    checkReservationDate,
}