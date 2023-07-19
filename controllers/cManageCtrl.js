const Customer = require("../models/Customer");
const bcrypt = require('bcrypt')

exports.add = async (req, res) => {
    const { name, email, contact_number, password } = req.body;
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds);
    await Customer.create({ name, email, contact_number, passwordHash });
    res.send("Customer added successfully.");
}

exports.update = async (req, res) => {
    const { email, ...rest } = req.body;
    await Customer.updateOne({
        email
    }, {
        $set: { ...rest }
    });
    res.send("Customer updated successfully.");
}

exports.remove = async (req, res) => {
    const { email } = req.params;
    await Vehicle.deleteOne({ email });
    res.send("Customer deleted successfully");
}