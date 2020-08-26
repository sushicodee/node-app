const productQuery = require("../query/product.query")
const validateImage = require('./../utils/helpers/imageValidation/imageValidation');
const find = (req,res,next) => {
    let condition = {};
    if(req.loggedInUser.role !== 1){
        condition.vendor = req.loggedInUser._id
    }
    productQuery.find(condition)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
}

const insert = (req,res,next) => {
    const data = req.body;
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
    //File upload TODO
    const data = req.body;
    data.user = req.loggedInUser._id;
    productQuery.update(req.params.id,data)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {find,insert,findById,search,deleteProduct,update};