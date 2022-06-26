// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');

// const storage = new GridFsStorage({
//     url: process.env.ATLAS_URI,
//     options: { useNewUrlParser: true, userUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg", "image/jpg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-logo-${file.originalname}`
//             return filename;
//         }

//         return {
//             bucketName: 'photos',
//             filename: `${Date.now()}-logo-${file.originalname}`,
//         }
//     }
// })

// module.exports = multer({ storage });