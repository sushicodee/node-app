const ProductModel = require("./../models/product.model");

const mapProductsHelper = (product, data) => {
  for (key in data) {
    switch (key) {
      case "2": {
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
            data.offers !== "none" &&
            data.offers !== undefined &&
            data.offerDiscount !== undefined
          ) {
            product.discount.offers = data.offers;
            product.discount.offerDiscount = data.offerDiscount;
          } else {
            product.discount.offers = "none";
            product.discount.offerDiscount = 0;
          }
          break;
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
      case "offers":
        break;
      case "discount":
        break;

      case "unitOfMeasurement": {
        product.size[key] = data[key];
        break;
      }
      case "value": {
        product.size[key] = data[key];
        break;
      }
      default:
        product[key] = data[key];
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

  return ProductModel.find(condition)
  .populate("vendor")
  .limit(perPage)
  .skip(skipCount)
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
