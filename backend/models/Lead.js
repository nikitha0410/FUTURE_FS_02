const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({

  name: String,

  email: String,

  status: String,

  notes: String

});

module.exports = mongoose.model("Lead", leadSchema);