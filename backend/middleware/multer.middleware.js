const multer  = require('multer')
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../public/temp');


if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname
      cb(null,uniqueSuffix )
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports=upload