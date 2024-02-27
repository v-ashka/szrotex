const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
router.route('/reservation')
        .get(productController.checkReservationDate)
router.route('/reservation/:id')
    .patch(productController.changeProductReservation)
router.route('/')
    .get(productController.getAllProducts)
    .post(productController.createNewProduct)
    .patch(productController.createNewProduct)
router.route('/:id')
    .get(productController.getProductById)
    .patch(productController.updateProduct)
module.exports = router