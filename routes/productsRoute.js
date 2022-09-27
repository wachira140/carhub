const express = require("express");
const router = express.Router();

const {authenticateUser} = require("../middlewares/authentication")

const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.route("/").get(getAllProduct).post(authenticateUser,createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = router;
