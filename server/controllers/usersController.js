const User = require('../models/user.model')
const UserDetails = require('../models/user.details.model')
const bcrypt = require('bcrypt')
const path = require('path')


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req,res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // if no user
    if(!users?.length){
        return res.status(400).json({message: 'No users found'})
    }

    res.json(users)
}

// @desc Get user by :id
// @route GET /users/:id
// @access Private
const getUserById = async (req,res) => {
    // Get user by id
    const {id} = req.params
    const user = await User.findById(id).select('-password').populate('userDetails').lean()

    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    const userDetails = await UserDetails.findOne({user: id}).exec()
    if(!userDetails){
        res.json(user)
    }else{
        const userObj = {user, userDetails}
        res.json(userObj)
    }
}

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = async (req,res) => {
    const {email, password, role} = req.body
    console.log(req.body)
    // Confirm data
    if(!email || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    if(role !== "CLIENT" && role !== "COMPANY"){
        return res.status(400).json({message: 'Role field not match with explicit values COMPANY or CLIENT'})
    }

    // Check for duplicate
    const duplicate = await User.findOne({email}).collation({locale: 'en', strength: 2}).lean().exec()

    if(duplicate){
        return res.status(409).json({message: 'Duplicate username'})
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt round
    userObject = {
        email,
        "password": hashedPwd,
        role
    }
    // create and store user
    const user = await User.create(userObject)
    console.log(`New user ID: ${user._id}`)
    const userDetailsObject = {
        user: user._id
    }
    const details = await UserDetails.create(userDetailsObject)

    console.log(details)
    if(user) {
        res.status(201).json({
            message: `New user ${email} created`
        })
    } else {
        res.status(400).json({
            message: 'Invalid user data received'
        })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = async (req,res) => {
    const { id,
        email,
        password,
        role,
        firstName,
        lastName,
        // avatarImage,
        // more details
        companyName,
        region,
        description,
        workSchedule,
        phoneNumber,
        imageBackgroundPage,
     } = req.body

    // Confirm data 
    if(!id || !email || !role){
        return res.status(400).json({message: 'All fields except password are required'})
    }
    
    // Does the user exist to update
    const user = await User.findById(id).exec()
    const userDetails = await UserDetails.findOne({user: id}).exec()
    // console.log(userDetails)
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    // chceck for duplicate
    const duplicate = await User.findOne({email}).collation({locale: 'en', strength: 2}).lean().exec()

    // allow updates to the origianl user
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'Duplicate username'})
    }

    user.email = email || user.email

    if(role !== "CLIENT" && role !== "COMPANY"){
        return res.status(400).json({message: 'Role field not match with explicit values COMPANY or CLIENT'})
    }

    if(role === "COMPANY"){
        if(!companyName){
            return res.status(400).json({message: "company name is required"})
        }else{
            userDetails.companyName = companyName
        }

        if(!description){
            return res.status(400).json({message: "description field is required"})
        }
        else{
            userDetails.description = description
        }

        if(!workSchedule){
            return res.status(400).json({message: "work schedule is required"})
        }else{
            userDetails.workSchedule = workSchedule
        }
            userDetails.imageBackgroundPage = imageBackgroundPage || userDetails.imageBackgroundPage
    }
    
    user.role = role || user.role
    // user details
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    userDetails.region = region || userDetails.region
    userDetails.phoneNumber = phoneNumber || userDetails.phoneNumber
    
    if(password){
        // hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const updatedUser = await user.save()
    await userDetails.save()
    res.json({message: `${updatedUser.email} updated`})
}


// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = async (req,res) => {
    const {id} = req.body

    // Confirm data
    if(!id){
        return res.status(400).json({message: 'User ID Required'})
    }

    // Does the user still have assigned notes?
    // const note = await Note.findOne({user: id}).lean().exec()
    // if(note){
    //     return res.status(400).json({message: 'User has assigned notes'})
    // }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()
    console.log(user)
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }

    await user.deleteOne()
    const reply = `User with email: ${user.email} with ID ${user._id} deleted`
    res.json(reply)
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUserById
}