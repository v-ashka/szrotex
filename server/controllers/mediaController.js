const User = require('../models/user.model')
const UserDetails = require('../models/user.details.model')
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

module.exports = {
    uploadAvatarImage,
    uploadBackgroundImage
}