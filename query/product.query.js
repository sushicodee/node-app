const ProductModel = require("./../models/product.model");

const mapProductsHelper = (product, data) => {
  for (key in data) {
    switch (key) {
      case "discountedItem": {
        product.discount = {};
        if (data[key] === "true" ? true : false) {
          product.discount[key] = data[key];
          if ((data.discountType !== "none" && data.discountType !== undefined && data.discount !== undefined)) {
            product.discount.discountType = data.discountType;
            product.discount.discount = data.discount;
          } else {
            product.discount.discountType = "none";
            product.discount.discount = ''
          }
          if ((data.offers !== "none" && data.offers !== undefined && data.offerDiscount !== undefined)) {
            product.discount.offers = data.offers;
            product.discount.offerDiscount = data.offerDiscount;
          } else {
            product.discount.offers = "none";
            product.discount.offerDiscount = ''
          }
          break;
      }
    }
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
};

const insert = (data) => {
  const newProduct = new ProductModel({});
  mapProductsHelper(newProduct, data);
  return newProduct.save();
};

const find = (condition) => {
  return ProductModel.find(condition).populate("vendor").exec();
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
};
