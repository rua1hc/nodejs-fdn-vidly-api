const Joi = require("joi");
const mongoose = require("mongoose");

const Rental = mongoose.model(
    "Rental",
    new mongoose.Schema({
        customer: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },
                isGold: {
                    type: String,
                    required: true,
                    default: false,
                },
                phone: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 20,
                },
            }),
            required: true,
        },
        movie: {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    required: true,
                    trim: true,
                    minlength: 1,
                    maxlength: 255,
                },
                dailyRentalRate: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 255,
                },
            }),
            required: true,
        },
        dateOut: {
            type: Date,
            required: true,
            default: Date.now,
        },
        dateExpired: {
            type: Date,
        },
        rentalFee: {
            type: Number,
            min: 0,
        },
    })
);

// ********* HELPER
function validateRental(rental) {
    const scheme = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });
    return scheme.validate({
        customerId: rental.customerId,
        movieId: rental.movieId,
    });
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
