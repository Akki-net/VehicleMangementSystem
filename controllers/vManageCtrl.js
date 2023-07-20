const Vehicle = require("../models/Vehicle");

exports.add = async (req, res) => {
    await Vehicle.create(req.body);
    res.status(201).send("vehicle added successfully.");
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

exports.maintain = async (req, res) => {
    const {model, period} = req.body;

    const vehicle = await Vehicle.findOne({model});
    if(vehicle.availability_status){
        vehicle.maintenance_period = period;
        vehicle.maintenance_status = true;

        vehicle.save();

        return res.status(200).send("vehicle is sent for maintenance");
    }

    res.send("vehicle isn't available right now.");
}