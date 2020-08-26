// const fs = require('fs');
// const path = require('path');
module.exports = (req, next, data) => {
  if (req.fileError) {
    return next({ message: "file must be an Image", status: 400 });
  }
  if(req.file){
      data.image = req.file.filename;
  }
  return true;
  // if(req.file){
  //     const {file} = req;
  //     if(file.mimetype.split('/')[0] !== 'image'){
  //         fs.unlink(path.join(process.cwd(),'files/images/' + file.filename), (err,done) => {
  //             if(err){
  //                 console.log('error deleting file')
  //             }else{
  //                 console.log('deleted',file.filename)
  //             }
  //         })
  //         return next({message:'file must be an Image',status:400})
  //     }
};
