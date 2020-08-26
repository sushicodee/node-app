const multer = require('multer');

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null,'./files/images/')
  },
  filename:(req,file,cb) => {
    cb(null,Date.now() + '-' + file.originalname)
  } 
})

const fileFilter = (req,file,cb) => {
  if(file.mimetype.split('/')[0] === 'image'){
    cb(null,true)
  }else{
    console.log('here file filter')
    req.fileError = true;
    cb(null,false)
  }
}

const upload = multer({
  storage,
  fileFilter
})

module.exports = upload;