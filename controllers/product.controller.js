const productQuery = require("../query/product.query")

const find = (req,res,next) => {
    let condition = {};
    if(req.loggedInUser.role !== 1){
        condition.vendor = req.loggedInUser._id
    }
    console.log(req,'here');
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
    data.vendor = req.loggedInUser._id;
    productQuery.insert(data)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err);
    })
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
    query = req.query.sku? {sku:req.query.sku} : {sku:req.body.sku}
    let condition = {query};
    productQuery.find(condition)
    .populate('vendor')
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
    //File upload todo
    productQuery.update(req.params.id,req.body)
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {find,insert,findById,search,deleteProduct,update};