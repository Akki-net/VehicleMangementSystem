const Booking = require('../models/Booking');

exports.vehicleStat = async (req, res) => {
    const list = await Booking.aggregate([
        {
            $group: {
                _id: "$model",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $set: {
                model: "$_id",
                _id: "$$REMOVE"
            }
        },
        {
            $sort: {
                count: -1
            }
        }
    ])

    res.json({ popular_vehicle: list[0].model, nob_per_vehicle: list });
}

exports.avgRentalDuration = async (req, res) => {
    let list = await Booking.aggregate([
        {
            $set: {
                d_diff: {
                    $dateDiff: {
                        startDate: "$booked_on",
                        endDate: "$till_date",
                        unit: "day"
                    }
                }
            }
        },
        {
            $project: {
                d_diff: 1,
                _id: 0
            }
        }
    ]);

    list = list.map(v => v.d_diff);

    const sum = list.reduce((total, value) => total + value);
    const avg = sum/list.length;

    res.json({average_rental_period: avg})
}