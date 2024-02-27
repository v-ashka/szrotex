const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
router.route('/')
        .get(productController.checkReservationDate)
router.route('/:id')
    .patch(productController.changeProductReservation)
module.exports = router