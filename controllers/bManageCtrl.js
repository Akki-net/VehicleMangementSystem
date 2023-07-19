const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const Vehicle = require("../models/Vehicle");

exports.book = async (req, res) => {
    const { email, model } = req.body;
    const customer = await Customer.findOne({ email });
    const vehicle = await Vehicle.findOne({ model });
    if (!customer || !vehicle) {
        return res.status(401).send("unmatched data!");
    }

    if(vehicle.availability_status){
        await Booking.create(req.body);
        await Vehicle.updateOne({model}, {
            $set: {
                availability_status: false
            }
        })

        return res.send("Vehicle is booked successfully.");
    }
   
    res.send("Vehicle is already booked");
}

exports.view = async (req, res) => {
    const {email} = req.params;

    const records = await Booking.find({email});

    res.json({records});
}