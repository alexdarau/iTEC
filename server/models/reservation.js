const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    startBookingTime: {
        type: Date
    },

    endBookingTime: {
        type: Date
    },

    workdeskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WorkDesk"
    }
});

const Reservation = mongoose.model('Reservation', ReservationSchema, 'Reservation');
module.exports = Reservation;