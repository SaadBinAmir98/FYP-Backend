const router = require("express").Router();

// controller
const {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProductById,
} = require("../controllers/products");

// middlewares
const { validateToken } = require("../middlewares/validate-token");
const { validateRequest } = require("../middlewares/validate-request");

// validation
const {
  addProductSchema,
  updateProductSchema,
} = require("../utils/validation/products-schema");

// routes
router.get("/all", getAllProducts);
router.get("/:id", getProductById);

router.post("/", validateToken, validateRequest(addProductSchema), addNewProduct);
router.patch("/:id", validateToken, validateRequest(updateProductSchema), updateProduct);

router.delete("/:id", validateToken, deleteProductById);

module.exports = router;
