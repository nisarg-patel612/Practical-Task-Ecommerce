const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const Product = require("../Models/Product");

exports.createVendor = async (req, res) => {
  const { name, email, password, permissions } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "vendor",
      permissions: permissions || [],
    });

    res.json({ message: "Vendor created", vendor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
