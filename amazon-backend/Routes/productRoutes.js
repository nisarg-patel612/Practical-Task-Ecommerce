const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../Controllers/productController");
const { verifyToken } = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/UploadMiddleware");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", verifyToken, upload.single("image"), createProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.put("/:id", updateProduct);

module.exports = router;
