const express = require('express')
const router = express.Router()
// const verifyJWT = require('../middleware/')
const mediaController = require('../controllers/mediaController')
router.route('/avatar')
    .post(mediaController.uploadAvatarImage)
    
router.route('/background-img')
    .post(mediaController.uploadBackgroundImage)

module.exports = router