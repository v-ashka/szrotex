const Product = require('../models/product.model')


// @desc Get all products
// @droute GET /product
// @access Private
const searchProduct = async (req, res) => {
    
    // search queries
    const { name, category, minPrice, maxPrice } = req.body
    // Get all products from MongoDB
    const filter = {}
    // user.firstName = firstName || user.firstName
    if(name){
        // filter.name = { $regex: new RegExp(name, "i") }
        filter.$or = [
            { "name": { $regex: new RegExp(name, "i") } },
            { "description": { $regex: new RegExp(name, "i") } },
        ]
        // filter.description = {$regex: new RegExp(name, "i")}
    }
    
    if(category){
        filter.category =  {$in: category }
    }

    if(minPrice && maxPrice){
        filter.price =  { $gte: minPrice, $lte: maxPrice }
    }

    if(minPrice){
        filter.price = { $gte: minPrice}
    }

    if(maxPrice){
        filter.price = { $lte: maxPrice}
    }
    
    

    console.log(filter)
    const searchResults = await Product.find(filter).exec()


    // // if(!category){
    // //     products = await Product.find({
    // //               $or: [
    // //                 { "name": },
    // //                 { "description": { $regex: new RegExp(name, "i") } },
    // //               ],
    // //       }).exec()
    // // }else{
    // //     products = await Product.find({
    // //         $and: [
    // //             { "category" : {$in: category} },
    // //             {
    // //                 $or: [
    // //                 { "name": { $regex: new RegExp(name, "i") } },
    // //                 { "description": { $regex: new RegExp(name, "i") } },
    // //               ],
    // //             }
    // //         ]
            
    // // }).exec()

    // }

    res.json(searchResults)
}


module.exports = {
    searchProduct,
}