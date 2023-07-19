const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    availability_status: { type: Boolean, default: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema, "Vehicle");
