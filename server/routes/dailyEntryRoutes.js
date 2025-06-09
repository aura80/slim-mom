const express = require('express');
const { createDailyEntry, getEntriesByDate, deleteEntry } = require("../controllers/dailyEntryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createDailyEntry);
router.get("/:date", authMiddleware, getEntriesByDate);
router.delete("/:date", authMiddleware, deleteEntry);

module.exports = router;
