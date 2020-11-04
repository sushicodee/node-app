const productModel = require("./../models/product.model");
const ProductModel = require("./../models/product.model");

const mapProductsHelper = (product, data) => {
  for (key in data) {
    switch (key) {
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
      case "loveCount":
        break;

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
            product.offerDiscountType = "none";
            product.discount.offers = "none";
            product.discount.offerDiscount = 0;
            product.discount.discount = 0;
          }
          break;
        }
      }
      case "status": {
        if (data["quantity"] && data[key]) {
          if (data["quantity"] === 0 && data[key] === "avaliable") {
            product[key] = "out of stock";
            break;
          } else {
            product[key] = data[key];
            break;
          }
        }
      }
      case "manuDate": {
        if (data[key]) {
          product[key] = data[key];
        }
        break;
      }
      case "expiryDate": {
        if (data[key]) {
          product[key] = data[key];
        }
        break;
      }
      case "size": {
        if (product.size["unitOfMeasurement"]) {
          product.size["unitOfMeasurement"] = data[key]["unitOfMeasurement"];
        }
        if (product.size["sizeValue"]) {
          product.size["sizeValue"] = data[key]["sizeValue"];
        }
        break;
      }
      case "color": {
        //todo
        if (data[key]) {
          product[key] = data[key];
        }
      }

      default:
        if (
          [
            "name",
            "price",
            "category",
            "subCategory",
            "weight",
            "quantity",
            "brand",
            "sku",
            "description",
            "image",
            "_id",
            "vendor",
          ].includes(key)
        ) {
          if (data[key]) {
            product[key] = data[key];
          }
        }
        break;
    }
  }

  //for rating
  if (data.productRating || data.ratingPoint) {
    product.ratings = product.ratings || [];
    if (data.ratingPoint && data.ratingMessage) {
      const rating = {
        message: data.ratingMessage,
        value: data.ratingPoint,
        user: data.user,
      };
      product.ratings.unshift(rating);
    } else if (!data.ratingPoint) {
      const rating = {
        message: data.ratingMessage,
        user: data.user,
      };
      product.ratings.unshift(rating);
    } else {
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

const find = (condition = {},options = {}, query = {}) => {
  return new Promise((resolve, reject) => {
  let perPage = parseInt(options.perPage) || 100;
  let currentPage = (parseInt(options.currentPage) || 1) - 1;
  let skipCount = perPage * currentPage;
  let sortObj = {}
  let sortVal = 1; 
  if(query.options && query.options.sort){
    switch(query.options.sort.sort){
      case 'asc':sortVal = 1;
      break;
      case'desc':sortVal = -1;
      break;
      default:break;
    }
    if(!query.options.sort.sortBy){
      sortObj['_id'] = sortVal;
    }else{
      sortObj[query.options.sort.sortBy] = sortVal
    }
  }
  ProductModel.find(condition, {})
  .sort(sortObj)
  .skip(skipCount)
  .limit(perPage)
  // .populate("vendor")
  .exec((err, data) => {
        if (!err) {
          ProductModel.countDocuments(condition).exec(
            (count_error, count) => {
              if (count_error) {
                return reject(count_error);
              }
              resolve({ data,count });
            }
          )
        }
      });
    });
};

const findOne = (condition,options = {}) => {
  return productModel.findOne(condition)
}

const findAll = (condition, options = {}) => {
  return ProductModel.find(condition, {}).sort({ _id: -1 }).exec();
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
      //for like
      if (data.love) {
        if (res.loggedInUser.role === 2) {
          find({ _id: data.user._id }, {}).then((data) => {
            if (data.love) {
              if (
                data.love.forEach((user, index) => {
                  if (user._id === data.user._id) {
                    data.love.splice(1, index);
                    return;
                  } else {
                    const love = {
                      user: data.user,
                    };
                    product.love.unshift(love);
                  }
                })
              )
                product.love = data.love;
            }
          });
        }
      }
      product.save((err, updated) => {
        if (err) {
          return reject(err);
        }
        //inform vendor todo
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
  findOne,
  update,
  remove,
  mapProductsHelper,
  findAll,
};
