const mongoose = require("mongoose");

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    contact_number: { type: Number, required: true, min: [6, 'Too short contact'], size: 10 },
    passwordHash: { type: String, required: true}
});

module.exports = mongoose.model("Customer", customerSchema, "Customer");
