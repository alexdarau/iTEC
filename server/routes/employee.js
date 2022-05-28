const express = require("express");
const Reservation = require("../models/reservation.js");
var mongoose = require('mongoose');
const server = express();
server.use(express.json());

server.post("/book", async (req, res) => {
    const { user_id, startDate, endDate, id } = req.body;

    const startBookingTime = new Date(startDate)
    const endBookingTime = new Date(endDate)
    const userId = new mongoose.Types.ObjectId(user_id);
    const reservations = await Reservation.find({ userId: userId })
    const reservationDates = []
    reservations.forEach(reservation => {
        console.log(reservation.startBookingTime)
        console.log(reservation.endBookingTime)
        reservationDates.push(reservation.startBookingTime)
        reservationDates.push(reservation.endBookingTime)
    })
    if (!multipleDateRangeOverlaps(reservationDates)) {

        var workdeskId = mongoose.Types.ObjectId(id);
        const reservation = {
            startBookingTime,
            endBookingTime,
            workdeskId,
            userId
        };

        console.log(reservation)

        await Reservation.create(reservation).then(reservation =>
            res.status(200).json({
                message: "Reservation successfully created",
                reservation
            })
        )
    } else {
        res.status(401).json({
            message: "Dates overlaps"
        })
    }
});

module.exports = server;


function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    return false;
}
function multipleDateRangeOverlaps(reservationDates) {
    var i, j;
    if (reservationDates.length % 2 !== 0)
        throw new TypeError('Arguments length must be a multiple of 2');
    for (i = 0; i < reservationDates.length - 2; i += 2) {
        for (j = i + 2; j < reservationDates.length; j += 2) {
            if (
                dateRangeOverlaps(
                    reservationDates[i], reservationDates[i + 1],
                    reservationDates[j], reservationDates[j + 1]
                )
            ) return true;
        }
    }
    return false;
}