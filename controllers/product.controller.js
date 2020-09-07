const fs = require('fs');
const productQuery = require("../query/product.query")
const validateImage = require('./../utils/helpers/imageValidation/imageValidation');
const find = (req,res,next) => {
    let condition = {};
    if(req.loggedInUser.role !== 1){
        condition.vendor = req.loggedInUser._id
    }
    productQuery.find(condition,req.query)

    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
}

const insert = (req,res,next) => {
    const data = req.body;
    if (req.fileErr) {
        return next({
            message: 'Invalid file format using file filter',
            status: 400
        })
    }
    if (req.file) {
        const mimeType = req.file.mimetype.split('/')[0];
        if (mimeType != 'image') {
            fs.unlink(path.join(process.cwd(), 'files/images/' + req.file.filename), function (err, done) {
                if (err) {
                    console.log('err deleteing file');
                } else {
                    console.log("file deleted")
                }
            })
            return next({
                msg: "Invalid file format",
                status: 400
            })
        }

        data.image = req.file.filename;
    }

    const isValid = validateImage(req,next,data);
    if(isValid){
        data.vendor = req.loggedInUser._id;
        productQuery.insert(data)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            next(err);
        })
    }
}

const findById = (req,res,next) => {
    let condition = {_id:req.params.id};
    productQuery.find(condition)
    .then (data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
} 

const search = (req,res,next) => {
    let condition = {};
    productQuery.mapProductsHelper(condition,req.body)
    if(req.body.minPrice){
        condition.price = {
            $gte:req.body.minPrice
        }
    }
    if(req.body.maxPrice){
        condition.price = {
            $lte:req.body.minPrice
        }
    }
    if(req.body.minPrice && req.body.maxPrice){
        condition.price = {
            $lte:req.body.minPrice,
            $gte:req.body.maxPrice
        }
    }
    if(req.body.fromDate && req.body.toDate){
        const fromDate = new Date(req.body.fromDate).setHours(0,0,0,0);
        const toDate = new Date(req.body.fromDate).setHours(23,59,59,999);
        condition.created_at = {
            $gte: newDate(fromDate),
            $lte:newDate(toDate)
        }

    }
    productQuery.find(condition,req.query)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
}

const deleteProduct = (req,res,next) => {
    productQuery.remove(req.params.id ,res,next)
}

const update = (req,res,next) => {
    const data = req.body;
   
    if (req.fileErr) {
        return next({
            message: 'Invalid file format using file filter',
            status: 400
        })
    }
    if (req.file) {
        const mimeType = req.file.mimetype.split('/')[0];
        if (mimeType != 'image') {
            
            fs.unlink(path.join(process.cwd(), 'files/images/' + req.file.filename), function (err, done) {
                if (err) {
                    console.log('err deleteing file');
                } else {
                    console.log("file deleted")
                }
            })
            return next({
                msg: "Invalid file format",
                status: 400
            })
        }
         
        data.image = req.file.filename;
    }

    data.vendor = req.loggedInUser._id;
    productQuery.update(req.params.id,data)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {find,insert,findById,search,deleteProduct,update};