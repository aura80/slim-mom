const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const { title, categories, calories, weight, groupBloodNotAllowed } =
      req.body;

    try {
        console.log("🔎 Date primite:", req.body);
        const newProduct = new Product({
          title,
          categories,
          calories,
          weight,
          groupBloodNotAllowed,
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};