const express = require("express");
const Reservation = require("../models/reservation.js");
const Workdesk = require("../models/workdesk.js");
var mongoose = require('mongoose');
const auth = require("../middleware/auth");
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
        reservationDates.push(reservation.startBookingTime)
        reservationDates.push(reservation.endBookingTime)
    })
    reservationDates.push(startBookingTime)
    reservationDates.push(endBookingTime)
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
        res.status(403).json({
            message: "Dates overlaps"
        })
    }
});

server.delete("/book/:id", async (req, res) => {
    const { id } = req.params;
    console.log("🚀 ~ file: employee.js ~ line 48 ~ server.delete ~ reservationId", id)

    Reservation.deleteOne({ _id: id }).then(response => {
        if (response.deletedCount == 0) {
            res.status(401).json({
                message: "Reservation not delete",
            });
        } else {
            res.status(200).json({
                message: response
            })
        }
    })
})

server.get("/book", async (req, res) => {

    Reservation.find({}).then(response => {
        res.status(200).json({
            response: response
        })
    })
});

server.get("/bookWorkdesk", async (req, res) => {
    const { id, startDate, endDate } = req.query;

    const startBookingTime = new Date(startDate)
    const endBookingTime = new Date(endDate)
    const floorId = new mongoose.Types.ObjectId(id);
    let response
    let reservationDates = []
    let offices = []

    await Workdesk.find({ floorId: floorId }).then(workdesks => {
        console.log("🚀 ~ file: employee.js ~ line 83 ~ awaitWorkdesk.find ~ workdesks", workdesks)
        workdesks.forEach(async workdesk => {
            console.log("🚀 ~ file: employee.js ~ line 101 ~ Reservation.find ~ workdesk._id", workdesk._id)
            await Reservation.find({ workdeskId: workdesk._id }).then(reservations => {
                if (reservations.length > 0) {
                    console.log("🚀 ~ file: employee.js ~ line 92 ~ Reservation.find ~ reservations", reservations)
                    reservations.forEach(reservation => {
                        reservationDates.push(reservation.startBookingTime)
                        reservationDates.push(reservation.endBookingTime)
                    })
                    reservationDates.push(startBookingTime)
                    reservationDates.push(endBookingTime)
                    console.log("🚀 ~ file: employee.js ~ line 94 ~ Reservation.find ~ reservationDates", reservationDates)
                    console.log(multipleDateRangeOverlaps(reservationDates))
                    if (multipleDateRangeOverlaps(reservationDates)) {
                        offices.push({
                            deskId: workdesk._id,
                            status: 'ocupat'
                        })
                    }
                    else {
                        offices.push({
                            deskId: workdesk._id,
                            status: 'liber'
                        })
                    }
                }
                reservationDates = []
            })

        })
    })
    console.log("Here")
    function doStuff() {
        res.status(200).json({
            message: "Success",
            offices
        })
     }
     setTimeout(doStuff, 1500);

});

server.get("/deskFromFloor/:id", async (req, res) => {
    const { id } = req.params;
    await Workdesk.find({ floorId: id }).then(workdesks => {
        res.status(200).json({
            message: "Success",
            workdesks
        })
    })
    
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