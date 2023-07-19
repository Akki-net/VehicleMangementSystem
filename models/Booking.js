const mongoose = require("mongoose");

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateDate = function(date) {
    return date > new Date();
}

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    booked_on: { type: Date, default: new Date() },
    till_date: { type: Date, required: true, validate: [validateDate, 'must be greater than today'] },
    model: { type: String, required: true }
});

module.exports = mongoose.model("Booking", bookingSchema, "Booking");
