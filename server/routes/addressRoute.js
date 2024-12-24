const express = require('express')
const router = express.Router()
const addressController = require('../controllers/addressController')
router.route('/')
    .get(addressController.getAllAddresses)
    .post(addressController.insertNewAddress)
module.exports = router