const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname);
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        console.log("middleware running")
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

module.exports = upload;