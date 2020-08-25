const router = require("express").Router();
const UserModel = require("./../../models/user.model");
const userMapHelper = require("../../utils/helpers/userMapHelper");
const JWT = require('jsonwebtoken');
const configs = require("../../configs/index");
const passwordHash = require("password-hash");

const createToken = (data) => {
    const token = JWT.sign(data,configs.jwt_secret);
    return token;
}

router.post("/register", (req, res, next) => {
  const data = req.body;
  console.log({data})
  const newUser = new UserModel({});

  userMapHelper(newUser, data);
  console.log(newUser,'over here');
  newUser
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  UserModel.findOne(
    {
      username: req.body.username,
    },
    (err, user) => {
      const invalidMessage = { message: "invalid username or password" }
      if (err) {
        return next(err);
      }
      if (user) {
        const isMatch = passwordHash.verify(req.body.password,user.password);
        if(isMatch){
            const token ='Bearer'+' '+ createToken({
                name:user.username,
                role:user.role,
                _id:user._id
            })
            res.status(200).send({user,token})
        }else{
             next(invalidMessage);
        }
      }else{
           next(invalidMessage);
      }
    })
});

router.post("./forgot-password", (req, res, next) => {});

module.exports = router;
