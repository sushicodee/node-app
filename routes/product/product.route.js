const router = require("express").Router();
const productController = require("./../../controllers/product.controller");
const Authenticate = require("./../../middlewares/authenticate");
const upload = require('./../../middlewares/uploadFileFilter');
const categories = require('./../../data/product/categories/categories');
router.route("/")
    .get(Authenticate,productController.find)
    .post(Authenticate,upload.single('image'),productController.insert);

router
  .route("/search")
  .post(productController.search)
  .get(productController.search);

router
  .route("/details/:id")
  .get(productController.findById)

router
.route("/categories")
.get((req,res,next) => {
  if(!categories){
    return next({message:'error loading categories'})
  }
  res.status(200).send(categories)
})  

router.route("/:id")
    .get(Authenticate,productController.findById)
    .put(Authenticate,upload.single('image'),productController.update)
    .delete(Authenticate,productController.deleteProduct);
module.exports = router;
