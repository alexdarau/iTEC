var express = require("express");
const WorkDesk = require("../models/workdesk");
const Floor = require("../models/floor")
const Office = require("../models/office")
const server = express();

server.use(express.json());

server.post("/add/workdesk",
    async (req, res) => {
        const { x, y, floorId } = req.body;

        const work = {
            x, 
            y,
            floorId
        };

        await WorkDesk.create(
            work
        ).then(work =>
            res.status(200).json({
                message: "Work successfully created",
                work
            })
        );
    }
);

server.post("/add/floor",
    async (req, res) => {
        const { name, officeId, map } = req.body;

        const floor = {
            name,
            officeId,
            map
        };

        const floorReq = await Floor.findOne({ name });

        if (!floorReq) {
            await Floor.create(
                floor
            ).then(floor =>
                res.status(200).json({
                    message: "Floor successfully created",
                    floor,
                })
            )
        } else {
            res.status(401).json({
                message: "Floor not created",
            });
        }
    }
);

server.post("/add/office",
    async (req, res) => {
        const { name } = req.body;

        const office = {
            name
        };

        const officeReq = await Office.findOne({ name });

        if (!officeReq) {
            await Office.create(
                office
            ).then(office =>
                res.status(200).json({
                    message: "Office successfully created",
                    office,
                })
            )
        } else {
            res.status(401).json({
                message: "Office not created",
            });
        }
    }
);

module.exports = server;