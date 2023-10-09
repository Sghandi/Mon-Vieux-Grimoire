const multer = require("multer");
const SharpMulter  =  require("sharp-multer");


const storage = 
SharpMulter ({
    destination: (req, file, callback) =>callback(null, 'images'),
    imageOptions:{
        fileFormat: "webp",
        quality: 50,
        resize: { width: 400},
    },
});


module.exports = multer({storage: storage}).single('image');

