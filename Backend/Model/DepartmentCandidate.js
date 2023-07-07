const mongoose = require("mongoose");

const DepartmentPositionsCandidateSchema = mongoose.Schema(
  {
    ref_id: {
      type: String,
      required: true,
    },
    f_name: {
      type: String,
      required: true,
    },
    l_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    l_salary: {
      type: String,
      required: true,
    },
    expected_salary: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    candidate_location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DepartmentPositionsCandidate = mongoose.model(
  "DepartmentPositionsCandidate",
  DepartmentPositionsCandidateSchema
);

module.exports = DepartmentPositionsCandidate;
