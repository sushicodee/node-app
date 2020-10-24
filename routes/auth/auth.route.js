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
  const newUser = new UserModel({});

  userMapHelper(newUser, data);
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
    (err, userData) => {
      const invalidMessage = { message: "invalid username or password",status:401 }
      if (err) {
        return next(err);
      }
      if (userData) {
        const isMatch = passwordHash.verify(req.body.password,userData.password);
        if(isMatch){
            const token ='Bearer'+' '+ createToken({
                name:userData.username,
                role:userData.role,
                _id:userData._id
            })
            const {createdAt,role,status,updatedAt,__v,_id,address,username,image,gender} = userData;
            const user = {image,username,createdAt,updatedAt,status,role,__v,address,_id,gender}
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
