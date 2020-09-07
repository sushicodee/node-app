const router = require("express").Router();
const productController = require("./../../controllers/product.controller");
const Authenticate = require("./../../middlewares/authenticate");
const upload = require('./../../middlewares/uploadFileFilter');

router.route("/")
    .get(Authenticate,productController.find)
    .post(Authenticate,upload.single('image'),productController.insert);

router
  .route("/search")
  .post(productController.search)
  .get(productController.search);

router.route("/:id")
    .get(Authenticate,productController.findById)
    .put(Authenticate,upload.single('image'),productController.update)
    .delete(Authenticate,productController.deleteProduct);

module.exports = router;
