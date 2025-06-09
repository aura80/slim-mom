const express = require('express');
const {
  getDailySummary,
  getCategorizedRestrictedCategories,
  getRestrictedProductsByBloodGroupAndTitle,
  getCaloriesOnly,
  addDailyEntry,
  addConsumedProduct,
  removeConsumedProduct,
} = require("../controllers/dailyIntakeController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// router.use(authMiddleware);

router.get('/summary', authMiddleware, getDailySummary);
router.get('/restricted-categories', authMiddleware, getCategorizedRestrictedCategories);
router.get('/restricted-titles', authMiddleware, getRestrictedProductsByBloodGroupAndTitle);
router.get('/calories-only', getCaloriesOnly);
router.post('/add', authMiddleware, addDailyEntry);
router.post('/add-product', authMiddleware, addConsumedProduct);
router.delete('/remove-product', authMiddleware, removeConsumedProduct);

module.exports = router;
