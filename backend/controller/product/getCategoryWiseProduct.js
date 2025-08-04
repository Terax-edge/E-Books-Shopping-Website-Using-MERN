const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    // accept from query or body, prefer query for GET
    const categoryRaw = req.query.category || req.body.category;

    if (!categoryRaw) {
      return res.status(400).json({
        message: "Category is required",
        error: true,
        success: false,
      });
    }

    // optional: make search case-insensitive and trim whitespace
    const category = categoryRaw.trim();
    const products = await productModel.find({
      category: { $regex: `^${category}$`, $options: "i" },
    });

    res.json({
      data: products,
      message: "Products fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryWiseProduct;
