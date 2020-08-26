const router = require("express").Router();
const productController = require("./../../controllers/product.controller");
const Authenticate = require("./../../middlewares/authenticate");

router.route("/")
    .get(Authenticate,productController.find)
    .post(Authenticate,productController.insert);

router
  .route("/search")
  .post(productController.search)
  .get(productController.search);

router.route("/:id")
    .get(Authenticate,productController.findById)
    .put(Authenticate,productController.update)
    .delete(Authenticate,productController.deleteProduct);



module.exports = router;
