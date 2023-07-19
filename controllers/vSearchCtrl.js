const Vehicle = require("../models/Vehicle");

exports.search = async (req, res) => {
    const { keyword, value } = req.query;
    const records = await Vehicle.find({ [keyword]: value });

    res.json({ records });
}

exports.filter = async (req, res) => {
    const { availability_status, fuel_type } = req.query;
    const records = await Vehicle.find({
        $or: [
            { availability_status }, { fuel_type }
        ]
    });

    res.json({ records });

}