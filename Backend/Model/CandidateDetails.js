const mongoose = require("mongoose");

const CandidateDetailsSchema = mongoose.Schema(
  {
    ref_id: {
      type: String,
      required: false,
    },
    f_name: {
      type: String,
      required: false,
    },
    l_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    aadhar_no: {
      type: String,
      required: false,
    },
    pan_no: {
      type: String,
      required: false,
    },
    bank_name: {
      type: String,
      required: false,
    },
    account_no: {
      type: String,
      required: false,
    },
    ifsc: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const CandidateDetails = mongoose.model(
  "CandidateDetails",
  CandidateDetailsSchema
);

module.exports = CandidateDetails;
