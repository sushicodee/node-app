const JWT = require("jsonwebtoken");
const config = require("./../configs/index");
const UserModel = require("./../models/user.model");

module.exports = (req, res, next) => {
  let token;
  if (req.headers["x-access-token"]) {
    token = req.headers["x-access-token"];
  }
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }
  if (req.headers["token"]) {
    token = req.headers["token"];
  }
  if (req.query["token"]) {
    token = req.query["token"];
  }
  if (token) {
    token = token.split(" ")[1];
    JWT.verify(token, config.jwt_secret, (err, verified) => {
      if (err) {
        return next(err);
      }
      UserModel.findById(verified._id).exec((err, user) => {
        if (err) {
          return next(err);
        }
        if (user) {
          req.loggedInUser = user;
          next();
        } else {
          return next({
            message: "user dosent exist",
          });
        }
      });
    });
  } else {
    next({ message: "token not provided" });
  }
};
