const Address = require('../models/addressRegion.model.js')
const path = require('path')

// @desc Get all addresses
// @droute GET /address
// @access Private
const getAllAddresses = async (req, res) => {
    // Get all products from MongoDB
    const address = await Address.find();
    // If no products 
    if (!address?.length) {
        return res.status(400).json({ message: 'No addresses found' })
    }
    res.json(address)
}

// @desc Create new address
// @droute POST /address
// @access Private
const insertNewAddress = async (req,res) => {
    const { country, region, city, zipCode, street, buildingNumber, apartamentNumber } = req.body
    console.log(req.body)
    if(!country || !region || !city || !zipCode || !street || !buildingNumber){
        return res.status(400).json({message: "All fields are required"})
    }
    
    const newAddress = await Address.create({country, region, city, zipCode, street, buildingNumber, apartamentNumber})
    if(newAddress){
        return res.status(201).json({message: "New address created"})
    }else{
        return res.status(400).json({message: "Invalid address data received"})
    }
    
}



module.exports = {
    getAllAddresses,
    insertNewAddress
}