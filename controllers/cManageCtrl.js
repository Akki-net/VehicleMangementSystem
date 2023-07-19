const Customer = require("../models/Customer");

exports.add = async (req, res) => {
    await Customer.create(req.body);
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