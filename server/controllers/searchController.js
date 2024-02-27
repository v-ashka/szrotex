const Product = require('../models/product.model')


// @desc Get all products
// @droute GET /product
// @access Private
const searchProduct = async (req, res) => {
    
    // search queries
    const { name, category, price } = req.body
    // Get all products from MongoDB
    
    let products
    if(!category){
        products = await Product.find({
                  $or: [
                    { "name": { $regex: new RegExp(name, "i") } },
                    { "description": { $regex: new RegExp(name, "i") } },
                  ],
          }).exec()
    }else{
        products = await Product.find({
            $and: [
                { "category" : {$in: category} },
                {
                    $or: [
                    { "name": { $regex: new RegExp(name, "i") } },
                    { "description": { $regex: new RegExp(name, "i") } },
                  ],
                }
            ]
            
    }).exec()

    }

    res.json(products)
}


module.exports = {
    searchProduct,
}