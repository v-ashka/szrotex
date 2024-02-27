const User = require('../models/user.model')
const UserDetails = require('../models/user.details.model')
const Product = require('../models/product.model')
const fs = require('fs');
const path = require('path'); // For handling path operations

const deleteFilesFromDirectory = async (dirPath) => {
    try {
        const files = await fs.readdir(dirPath);
    
        const deleteFilePromises = files.map(file =>
          fs.unlink(path.join(dirPath, file)),
        );
    
        await Promise.all(deleteFilePromises);
      } catch (err) {
        console.log(err);
      }
}

const uploadAvatarImage = async (req, res) => {
    const { id } = req.body
    const { avatarImage } = req.files;
    
    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: `User with ID: ${id} not found`})
    }

    if (!avatarImage) {
        return res.status(400).json({ message: "Failed to upload image" });
    }

    const uniqueFilename = `${id}.${avatarImage.mimetype.split('/')[1]}`;
    const avatarDirectoryPath = path.join(__dirname, '..', 'upload', 'avatar', id);

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'upload', 'avatar'))){
            fs.mkdirSync(path.join(__dirname, '..', 'upload', 'avatar'))
        }

        if (!fs.existsSync(avatarDirectoryPath)) {
            fs.mkdirSync(avatarDirectoryPath);
        }

        const uploadPath = path.join(avatarDirectoryPath, uniqueFilename);
        console.log(uniqueFilename)
        
        user.avatarImage = uniqueFilename
        const updatedUser = await user.save()

        await avatarImage.mv(uploadPath);
        res.status(200).json({ message: `Avatar upload success. user id: ${updatedUser.id} ${updatedUser.email} ` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to upload image: " + error.message });
    }
};

const uploadBackgroundImage = async (req,res) => {
    const { id } = req.body
    const { imageBackgroundPage } = req.files

    // const user = await User.findById(id).exec()
    const user = await UserDetails.findOne({user: id}).exec()
    if(!user){
        return res.status(400).json({message: `User with ID: ${id} not found`})
    }

    if(!imageBackgroundPage){
        return res.status(400).json({message: 'File not found'})
    }

    if(!/^image/.test(imageBackgroundPage.mimetype)){
        return res.status(400).json({message: "File does not have required mime type"})
    }

    const uniqueFilename = `${id}.${imageBackgroundPage.mimetype.split('/')[1]}`;
    const avatarDirectoryPath = path.join(__dirname, '..', 'upload', 'background-img', id);
    try{
        if(!fs.existsSync(path.join(__dirname, ".." , "upload", "background-img"))){
            fs.mkdirSync(path.join(__dirname, "..", "upload", "background-img"))
        }

        if(!fs.existsSync(avatarDirectoryPath)){
            fs.mkdirSync(avatarDirectoryPath)
        }

        const uploadPath = path.join(avatarDirectoryPath, uniqueFilename)

        user.imageBackgroundPage = uniqueFilename
        const updatedUser = await user.save()

        await imageBackgroundPage.mv(uploadPath)
        res.status(200).json({message: `Background image upload success, user id: ${updatedUser.id}`})

    }catch(err){
        console.error(err)
        res.status(400).json({message: "Failed to upload image: " + err.message})
    }
}

const uploadProductImage = async (req,res) => {
    const { product_id} = req.body
    const { productImg } = req.files;
    const product = await Product.findById(product_id).exec()

    if(!product) {
        return res.status(400).json({message: `Product with ID: ${product_id} not found`})
    }

    if(!productImg){
        return res.status(400).json({message: 'File not found'})
    }

    if(!/^image/.test(productImg.mimetype)){
        return res.status(400).json({message: "File does not have required mime type"})
    }

    const uniqueFilename = `${product_id}.${productImg.mimetype.split('/')[1]}`;
    const avatarDirectoryPath = path.join(__dirname, '..', 'upload', 'product', product.user.toString(), product_id);
    console.log(uniqueFilename, avatarDirectoryPath)
    try{
        if(!fs.existsSync(path.join(__dirname, ".." , "upload", "product", product.user.toString()))){
            fs.mkdirSync(path.join(__dirname, "..", "upload", "product", product.user.toString()))
        }

        if(!fs.existsSync(avatarDirectoryPath)){
            fs.mkdirSync(avatarDirectoryPath)
        }

        const uploadPath = path.join(avatarDirectoryPath, uniqueFilename)

        product.productImg = uniqueFilename
        const updatedProduct = await product.save()

        await productImg.mv(uploadPath)
        res.status(200).json({message: `Product image upload success, user id: ${updatedProduct._id}`})

    }catch(err){
        console.error(err)
        res.status(400).json({message: "Failed to upload image: " + err.message})
    }
    
}

module.exports = {
    uploadAvatarImage,
    uploadBackgroundImage,
    uploadProductImage
}