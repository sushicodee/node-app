const ProductModel = require("./../models/product.model");

const mapProductsHelper = (product, data) => {
  for (key in data) {
    switch (key) {
        
      case "discountedItem": {
        product.discount = {};
        if (data[key] === "true" ? true : false) {
          product.discount[key] = data[key];
          if (
            data.discountType !== "none" &&
            data.discountType !== undefined &&
            data.discount !== undefined
          ) {
            product.discount.discountType = data.discountType;
            product.discount.discount = data.discount;
          } else {
            product.discount.discountType = "none";
            product.discount.discount = 0;
          }
          if (
            data.offerDiscountType !== "none" &&
            data.offers !== undefined &&
            data.offerDiscount !== undefined
          ) {
            product.discount.offerDiscountType = data.offerDiscountType;
            product.discount.offers = data.offers;
            product.discount.offerDiscount = data.offerDiscount;
          } else {
            product.offerDiscountType ="none"
            product.discount.offers = "none";
            product.discount.offerDiscount = 0;
            product.discount.discount = 0;
          }
          break;
        }
      }
      case 'status':{
        if(data['quantity'] && data[key]){
          if(data['quantity'] === 0 && data[key] === 'avaliable'){
              product[key] = 'out of stock'
              break;
          }
          else{
            product[key] = data[key]
            break;
          }
        }
      }
      case 'manuDate':{
        if(data[key]){
          product[key] = data[key]
        }
        break;
      }
      case 'expiryDate':{
        if(data[key]){
          product[key] = data[key]
        }
        break;
      }
      case'size':{
        if(product.size['unitOfMeasurement']){
          product.size['unitOfMeasurement'] = data[key]['unitOfMeasurement'];
        }
        if(product.size['sizeValue']){
          product.size['sizeValue'] = data[key]['sizeValue'];
        }
        break;
      }
      case 'color':{
          //todo
          if(data[key]){
            product[key] = data[key]
          }
      }
      case "ratingMessage":
        break;
      case "ratingPoint":
        break;
      case "offerDiscount":
        break;
      case "discountType":
        break;
      case "offerDiscountType":
          break;
      case "offers":
        break;
      case "discount":
        break;
      case'loveCount':
          break;
      default:
        if(['name','price','category','subCategory','weight','quantity','brand','sku','description','image','_id'].includes(key)){
          if(data[key]){
            product[key]=data[key]
          }
        }
       break;
    }
  }
  //for rating
  if(data.productRating || data.ratingPoint){
    product.ratings = product.ratings || [];
          if (data.ratingPoint && data.ratingMessage) {
            const rating = {
              message: data.ratingMessage,
              value: data.ratingPoint,
              user: data.user,
            };
            product.ratings.unshift(rating);
          } else if(!data.ratingPoint) {
            const rating = {
              message: data.ratingMessage,
              user: data.user,
            };
            product.ratings.unshift(rating);
          }
          else{
            const rating = {
              value: data.ratingPoint,
              user: data.user,
            };
            product.ratings.unshift(rating);
          }
  }
};

const insert = (data) => {
  const newProduct = new ProductModel({});
  mapProductsHelper(newProduct, data);
  return newProduct.save();
};

const find = (condition , options = {}) => {
  let perPage = (parseInt(options.perPage)) || 100;
  let currentPage = (parseInt(options.currentPage) || 1) - 1;
  let skipCount = perPage * currentPage;

  return ProductModel
  .find(condition,{})
  .sort({_id:-1})
  .limit(perPage)
  .skip(skipCount)
  .populate("vendor")
  .exec();
};

const update = (id, data) => {
  return new Promise((resolve, reject) => {
    ProductModel.findById(id, (err, product) => {
      if (err) {
        return reject(err);
      }
      if (!product) {
        return reject({ message: "product not found" });
      }
      mapProductsHelper(product, data);
      product.save((err, updated) => {
        if (err) {
          return reject(err);
        }
        resolve(updated);
      });
    });
  });
};

const remove = (id, res, next) => {
  ProductModel.findById(id, (err, product) => {
    if (err) {
      return next(err);
    }
    if (!product) {
      return next({ message: "product not found" });
    }
    product.remove((err, data) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(data);
    });
  });
};

module.exports = {
  insert,
  find,
  update,
  remove,
  mapProductsHelper,
};
