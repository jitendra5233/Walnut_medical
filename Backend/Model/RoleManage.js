const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    access: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Roles", RoleSchema);

module.exports = Role;
