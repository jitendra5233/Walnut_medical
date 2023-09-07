const mongoose = require("mongoose");

const BatchDataSchema = mongoose.Schema(
  {
    batch_name: {
      type: String,
      required: false,
    },
    line_name: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const BatchData = mongoose.model("BatchData", BatchDataSchema);

module.exports = BatchData;
