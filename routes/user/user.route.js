const router = require("express").Router();
const UserModel = require("./../../models/user.model");
const userMapHelper = require('./../../utils/helpers/userMapHelper');
const authorize = require("./../../middlewares/authorize");
router
  .route("/")
  .get(authorize,(req, res, next) => {
    //fetch all users
    const condition = {};
    //data we want is projection
    const projection = {};

    // const projection = {username:1,email:1,role:1,_id:1}
    UserModel.find(condition, projection)
      .sort({
        _id: -1,
      })
      // .limit(10)
      // .skip(1)
      //exec is used for query building
      .exec((err, users) => {
        if (err) {
          return next(err);
        }
        res.status(200).send(users);
      });
  })
  .post((req, res, next) => {});

router
  .route("/dashboard")
  .get((req, res, next) => {})
  .post((req, res, next) => {})
  .delete((req, res, next) => {})
  .put((req, res, next) => {});

router
  .route("/profile")
  .get((req, res, next) => {
    res.send("from user profile");
  })
  .post((req, res, next) => {})
  .delete((req, res, next) => {})
  .put((req, res, next) => {});

router
  .route("/:id")

  .get((req, res, next) => {
    //find single user
    UserModel.findById(req.params.id, (err, user) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(user);
    });
  })
  .delete(authorize,(req, res, next) => {
    if(!checkAdmin(req.loggedInUser)){
      return next({message:'permission denied'})
    }
    UserModel.findOne({ _id: req.params.id }).exec((err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({ message: "User not found" });
      }
      user.remove((err, removed) => {
        if (err) {
          return next(err);
        }
        res.status(200).send(removed);
      });
    });
  })

  .put((req, res, next) => {
    const data = req.body;
    UserModel.findById(req.params.id, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({ message: "user not found" });
      }
      userMapHelper(user,data,req.loggedInUser)
      user
        .save()
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          return next(err);
        });
    });
  });

module.exports = router;
