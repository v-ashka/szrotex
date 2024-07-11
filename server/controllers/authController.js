const User = require('../models/user.model')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// acess Public

const login = asyncHandler(async (req, res) => { 
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const foundUser = await User.findOne({ username }).exec()
    
    if (!foundUser) {
        return res.status(401).json({message: 'Unauthrorized'})
    }

    const match = await bycrypt.compare(password, foundUser.password)

    if (!match)
        return res.status(401).json({ message: 'Unauthroized' })
    
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
            }
        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn: '15m'
        }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: true, //htps
        sameSite: 'None', // cross-site cookie
        maxAge: 7*24*60*60*1000 // cookie expiry: set to match refreshToken
    })

    // Send accessToken containg username and roles
    res.json({accessToken})
})