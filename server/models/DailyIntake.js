const mongoose = require('mongoose');

const DailyIntakeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dailyCalories: {
        type: Number,
        required: true
    },
    recommendedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    restrictedProducts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
});

const DailyIntake = mongoose.model('DailyIntake', DailyIntakeSchema);

module.exports = DailyIntake;