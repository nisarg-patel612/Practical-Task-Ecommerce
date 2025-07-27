const Product = require('../Models/Product');

exports.createProduct = async (req, res) => {
  const { title, description, price, category, image } = req.body;
  try {
    const product = await Product.create({
      title, description, price, category,image, vendorId: req.user.userId
    });
    res.status(201).json({ message: 'Product added', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


