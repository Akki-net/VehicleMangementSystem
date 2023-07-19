const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hashPass: { type: String, required: true}
});

module.exports = mongoose.model("Admin", adminSchema, "Admin");
