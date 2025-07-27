const Product = require("../Models/Product");

// create product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const imagePath = req.file.filename;

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image: imagePath,
      vendorId: req.user.userId,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.json({
      message: " Product Deleted Successfully ",
    });
  } catch (error) {
    res.json({
      message: " Product deleted successfully ",
    });
  }
};

// update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
};

// all product
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
