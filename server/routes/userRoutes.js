const express = require('express')
const router = express.Router()
const userContoller = require('../controllers/usersController')
// const verifyJWT = require('../middleware/')

router.route('/')
    .get(userContoller.getAllUsers)
    .post(userContoller.createNewUser)
    .patch(userContoller.updateUser)
    .delete(userContoller.deleteUser)
router.route('/:id')
    .get(userContoller.getUserById)
module.exports = router