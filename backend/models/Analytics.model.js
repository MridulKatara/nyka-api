const mongoose = require('mongoose');

const analyticsDataSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Define methods for fetching data
analyticsDataSchema.statics.getGenderChartData = async function () {
  return this.aggregate([
    {
      $group: {
        _id: '$gender',
        count: { $sum: 1 },
      },
    },
  ]);
};

analyticsDataSchema.statics.getCategoryChartData = async function () {
  return this.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
};

const AnalyticsData = mongoose.model('AnalyticsData', analyticsDataSchema);

module.exports = AnalyticsData;
