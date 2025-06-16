const DailyEntry = require('../models/DailyEntry');

exports.createDailyEntry = async (req, res) => {
    try {
        console.log("+++++++++++Request body: ", req.body);
        const { date, productId, quantity } = req.body;
        const userId = req.user.id;

        if (!date) {
          return res.status(400).json({ message: "Date is required" });
        }
        if (!productId || !quantity) {
          return res
            .status(400)
            .json({ message: "ProductId and quantity are required" });
        }

        let dailyEntry = await DailyEntry.findOne({ userId, date });

        if (!dailyEntry) {
            dailyEntry = new DailyEntry({ userId, date, consumedProducts: [] });
        }

        dailyEntry.consumedProducts.push({ productId, quantity });
        await dailyEntry.save();

        res.status(201).json({ message: 'Daily entry created successfully', dailyEntry });
    } catch (error) {
        console.error('Error creating daily entry:', error);
        res.status(500).json({ message: 'Server error - at adding the entry in the journal', error: error.message });
    }
};

exports.getEntriesByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const userId = req.user.id;

        console.log("🔍 Căutăm date pentru:", date, "și userId:", userId);

        const entries = await DailyEntry.findOne({ userId, date })
            .populate('consumedProducts.productId');
        if (!entries) {
            return res.status(404).json({ message: 'No entries found for this date' });
        }

        res.json(entries);
    } catch (error) {
        console.error("❌ Error fetching daily entries:", error);
        res.status(500).json({ message: 'Server error - at fetching the entries from the journal', error: error.message });
    }
};

exports.deleteEntry = async (req, res) => {
    try {
        const { date } = req.params;
        const userId = req.user.id;

        const dailyEntry = await DailyEntry.findOneAndDelete({ userId, date });

        if (!dailyEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting daily entry:', error);
        res.status(500).json({ message: 'Server error - at deleting the entry from the journal', error: error.message });
    }
};
