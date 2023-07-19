const Vehicle = require("../models/Vehicle");

exports.add = async (req, res) => {
    await Vehicle.create(req.body);
    res.send("vehicle added successfully.");
}

exports.update = async (req, res) => {
    const { model, ...rest } = req.body;
    await Vehicle.updateOne({
        model
    }, {
        $set: { ...rest }
    });
    res.send("vehicle updated successfully.");
}

exports.remove = async (req, res) => {
    const { model } = req.params;
    await Vehicle.deleteOne({ model });
    res.send("vehicle deleted successfully");
}