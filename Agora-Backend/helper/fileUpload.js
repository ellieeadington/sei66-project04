// requiring middileware for uploading images 

// const { builtinModules } = require('module');
const multer = require('multer')
const path =require('path')

// this is where the specification of the image file is determined

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image')
    },
    filename: function (req, file, cb) {

      cb(null, file.fieldname + '_' + Date.now() 
      + path.extname(file.originalname))
  
    }
  });

//   filtering the images so only png jpg or jpeg can be accepted 
  const filefilter = (req,file, cb) => {
    if(file.mimetype === "image/png" || file.mimetyple === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    }
    else{
        cb(null,false)
    }
  }

const upload = multer({storage:storage, filefilter: filefilter})

module.exports= upload;