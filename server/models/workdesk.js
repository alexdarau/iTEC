const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkDeskSchema = new Schema({
    x: {
        type: Float32Array
    },

    y: {
        type: Float32Array
    },

    available: {
        type: String,
        enum: ["available", "booked", "permanent"]
    },

    startBookingTime: {
        type: Date
    },

    endBookingTime: {
        type: Date
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    floorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor"
    }
});

const WorkDesk = mongoose.model('WorkDesk', WorkDeskSchema, 'WorkDesk');

module.exports = WorkDesk;
