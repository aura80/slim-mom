const DailyIntake = require('../models/DailyIntake');
const DailyEntry = require('../models/DailyEntry');
const Product = require('../models/Product');

const calculateDailyCalories = (weight, height, age) => {
    const bmr = 10 * weight + 6.25 * height - 5 * age - 161; // Mifflin-St Jeor Equation
    return bmr;
};

exports.getCaloriesOnly = async (req, res) => {
    try {
        const { weight, height, age } = req.query;

        if (!weight || !height || !age) {
            return res.status(400).json({ message: `Weight, height, and age are required` });
        }

        console.log(`🔍 Calculating daily calories for: weight ${weight}, height ${height}, age ${age}`);

        const dailyCalories = calculateDailyCalories(weight, height, age);

        res.status(200).json({ dailyCalories });
    } catch (error) {
        console.error('Error calculating daily calories:', error);
        res.status(500).json({ message: 'Server error - at calculating daily calories', error: error.message });
    }
};

const getRestrictedProductsByBloodGroup = async (bloodGroup) => {
    try {
        const restrictedCategories = categorizeFoodsByBloodGroup(bloodGroup);
        const restrictedProducts = await Product.find({
          categories: { $in: restrictedCategories },
        }).select("_id title calories");
        // const restrictedProducts = await Product.find({
        //   [`groupBloodNotAllowed.${bloodGroup}`]: { $eq: true }, // $eq operator ensures we match true values - exact compare
        // });

        if (!restrictedProducts.length) {
          console.warn(
            `⚠️ Nu există produse restricționate pentru grupa ${bloodGroup}`
          );
        }

        return restrictedProducts;
    } catch (error) {
        console.error("❌ Error fetching restricted products:", error);
        throw new Error("❌ Error fetching restricted products");
    }
};

const calculateDailyConsumedCalories = (products) => {
    console.log("🔎 Caloric consumption calculation for products:", products);

    return products.reduce(
        (total, product) => {
            if (!product.productId || typeof product.productId !== "object" || !product.productId.calories) {
              console.warn(
                `⚠️ Product with ID ${product.productId} does not have calories defined.`
              );
              return total;
            }

            const caloriesPerGram = product.productId.calories / 100;
            const consumedCalories = caloriesPerGram * product.quantity;

            console.log(
              `🔹 Product: ${product.productId.title}, Calories per 100g: ${product.productId.calories}, Quantity: ${product.quantity}, Calculated calories: ${consumedCalories}`
            );

            return total + consumedCalories;
        }, 0
    );
};

const addDailyEntry = async (userId, date, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(
        `❌ Product with ID ${productId} does not exist in the database.`
      );
    }

    let entry = await DailyEntry.findOne({ userId, date });
    if (!entry) {
      entry = new DailyEntry({ userId, date, consumedProducts: [] });
    }

    entry.consumedProducts.push({
      productId: mongoose.Types.ObjectId(product._id),
      quantity,
    });
    await entry.save();

    console.log("✅ Product added successfully:", product.title);
  } catch (error) {
    console.error("❌ Error adding consumed product:", error);
  }
};

exports.addDailyEntry = async (req, res) => {
  try {
    const { productId, quantity, date } = req.body;
    const userId = req.user.id; // Preia ID-ul utilizatorului autentificat

    if (!productId || !quantity || !date) {
      return res
        .status(400)
        .json({ message: "Product ID, quantity, and date are required" });
    }

    await addDailyEntry(userId, date, productId, quantity);

    res.status(201).json({ message: "Daily entry updated successfully!" });
  } catch (error) {
    console.error("❌ Error adding daily entry:", error);
    res
      .status(500)
      .json({
        message: "Server error - at adding daily entry",
        error: error.message,
      });
  }
};

const getCategorizedRestrictedProductsByBloodGroup = async (bloodGroup) => {
    try {
        const allRestrictedProducts = await Product.find({
            [`groupBloodNotAllowed.${bloodGroup}`]: { $eq: true }
        });

        const categorizedRestrictions = {
            flourProducts: [],
            dairy: [],
            redMeat: [],
            smokedMeats: []
        };

        allRestrictedProducts.forEach(product => {
            if (
              ["flour", "cereals", "dairy", "pasta"].includes(
                product.categories
              )
            ) {
              categorizedRestrictions.flourProducts.push(product);
            } else if (
              ["meat", "sausage", "dairy", "soft drinks"].includes(
                product.categories
              )
            ) {
              categorizedRestrictions.dairy.push(product);
            } else if (
              ["flour", "seeds", "sesame", "poppy", "berries"].includes(product.categories)
            ) {
              categorizedRestrictions.redMeat.push(product);
            } else if (
              ["meat", "flour", "cereals", "oils and fats"].includes(
                product.categories
              )
            ) {
              categorizedRestrictions.smokedMeats.push(product);
            }
        });

        return categorizedRestrictions;
    } catch (error) {
        console.error("❌ Error fetching categorized restricted products:",error);
        throw new Error("❌ Error fetching restricted products");
    }
};

exports.getCategorizedRestrictedCategories = async (req, res) => {
  try {
    const { bloodGroup } = req.query;

    console.log(
      "🔎 Filtering the restricted products for blood group:",
      bloodGroup
    );

    if (!bloodGroup) {
      return res.status(400).json({ message: "Blood group is required" });
    }

    const restrictedProducts = await getCategorizedRestrictedProductsByBloodGroup(
      bloodGroup
    );

    res.status(200).json(restrictedProducts);
  } catch (error) {
    console.error("❌ Error fetching restricted categories:", error);
    res
      .status(500)
      .json({
        message: "Server error - at fetching the restricted categories",
        error: error.message,
      });
  }
};

const categorizeFoodsByBloodGroup = (bloodGroup) => {
    const categories = {
        1: ["flour", "cereals", "dairy", "pasta"],
        2: ["meat", "sausage", "dairy", "soft drinks"],
        3: ["flour", "seeds", "sesame", "poppy", "berries"],
        4: ["meat", "flour", "cereals", "oils and fats"]
    };
    return categories[bloodGroup] || [];
};

const getRestrictedProductsByBloodGroupAndTitle = async (bloodGroup) => {
    try {
        const restrictedCategories = categorizeFoodsByBloodGroup(bloodGroup);

        const restrictedProducts = await Product.find({
            categories: { $in: restrictedCategories }
        }).select("title");

        return restrictedProducts.map(product => product.title);
    } catch (error) {
        console.error("❌ Error fetching restricted products by blood group and title:", error);
        throw new Error("❌ Error fetching restricted products");
    }
};

exports.getRestrictedProductsByBloodGroupAndTitle = async (req, res) => {
    try {
        const { bloodGroup } = req.query;

        console.log("🔎 Searching for restricted products for blood group:", bloodGroup);

        if (!bloodGroup) {
            return res.status(400).json({ message: "Blood group is required" });
        }

        const restrictedProducts = await getRestrictedProductsByBloodGroupAndTitle(bloodGroup);

        res.status(200).json(restrictedProducts);
    } catch (error) {
        console.error("❌ Error fetching restricted products by blood group and title:", error);
        res.status(500).json({ message: "Server error - at fetching the restricted products", error: error.message });
    }
};

// Endpoint to create or update daily intake
exports.getDailySummary = async (req, res) => {
    try {
        const { weight, height, age, bloodGroup, date } = req.query || {};

        const userId = req.user.id;

        console.log(
          "🔍 Searching data for: ",
          userId,
          " and user data: ",
          JSON.stringify(req.query, null, 2)
        );

        const dailyRate = calculateDailyCalories(weight, height, age);

        const entry = await DailyEntry.findOne({ userId, date }).populate({
          path: "consumedProducts.productId",
          model: "Product",
          select: "_id title calories",
        });

        console.log(
          "🔎 Consumed products after population:",
          entry ? entry.consumedProducts : "No entry found"
        );

        console.log(
          "🔎 Populated consumed products:",
          JSON.stringify(entry?.consumedProducts, null, 2)
        );

        const consumed = entry && entry.consumedProducts ? calculateDailyConsumedCalories(entry.consumedProducts).toFixed(2) : 0;
        const left = (dailyRate - consumed).toFixed(2);
        const percentage = consumed > 0 ? ((consumed / dailyRate) * 100).toFixed(2) : 0;
        const restrictedProducts = await getRestrictedProductsByBloodGroup(bloodGroup);

        // console.log("Restricted products: ", restrictedProducts);

        res.status(200).json({
            userId,
            date,    
            dailyRate,
            consumed,
            left,
            percentage,
            restrictedProducts
        });
    } catch (error) {
        console.error('Error fetching daily summary:', error);
        res.status(500).json({ message: 'Server error - at fetching the daily summary', error: error.message });
    }
};

exports.addConsumedProduct = async (req, res) => {
  try {
    const { productId, quantity, date } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity || !date) {
      return res
        .status(400)
        .json({ message: "Product ID, quantity, and date are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let entry = await DailyEntry.findOne({ userId, date });
    if (!entry) {
      entry = new DailyEntry({ userId, date, consumedProducts: [] });
    }

    entry.consumedProducts.push({ productId: product._id, quantity });
    await entry.save();

    res
      .status(201)
      .json({
        message: "Product added successfully!",
        productTitle: product.title,
        productQuantity: quantity,
      });
  } catch (error) {
    console.error("❌ Error adding consumed product:", error);
    res
      .status(500)
      .json({
        message: "Server error - at adding consumed product",
        error: error.message,
      });
  }
};

exports.removeConsumedProduct = async (req, res) => {
    try {
        const { productId, quantity, date } = req.body;
        const userId = req.user.id;

        if (!productId || !quantity || !date) {
            return res.status(400).json({ message: "Product ID, quantity, and date are required" });
        }

        const entry = await DailyEntry.findOne({ userId, date });

        if (!entry) {
            return res.status(400).json({ message: "No entry found for this date" });
        }

        entry.consumedProducts = entry.consumedProducts.filter(product => product.productId.toString() !== productId || product.quantity !== quantity);
        await entry.save();

        res.status(200).json({ message: "Product removed successfully!" });
    } catch (error) {
        console.error("❌ Error removing consumed product:", error);
        res.status(500).json({ message: "Server error - at removing consumed product", error: error.message });
    }
};



