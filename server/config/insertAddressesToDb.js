const mongoose = require('mongoose')
const Address = require('../models/addressRegion.model');
const addressesData = require('./address-seed.json');
require('dotenv').config();

const seedDB = async () => {
    try{
        const existedAddresses = await Address.find();
        console.log(`Found ${existedAddresses.length} addresses`);
        if(existedAddresses.length === 0){
            const insertedAddresses = await Address.insertMany(addressesData);
            console.log(insertedAddresses);
            console.log(`Inserted ${insertedAddresses.length} addresses`);
        }
    }catch(err){
        console.error('Error while seeding addresses', err);
    }
};

module.exports = seedDB;