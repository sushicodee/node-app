const router = require("express").Router();

router
  .route("/")
  .get((req, res, next) => {

  })
  .post((req, res, next) => {
      // const newComment = new UserModel({});
      // newCommnet.commentedBy = req.loggedInUser.name;
  })
  .delete((req, res, next) => {})
  .put((req, res, next) => {});

module.exports = router;
