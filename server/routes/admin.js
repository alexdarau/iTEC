var express = require("express");
const WorkDesk = require("../models/workdesk");
const Floor = require("../models/floor")
const Office = require("../models/office");
const id = require("faker/lib/locales/id_ID");
const server = express();
const mongoose = require('mongoose');

server.use(express.json());

server.post("/workdesk",
    async (req, res) => {
        const { x, y, id } = req.body;
        const floorId = mongoose.Types.ObjectId(id);

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

server.post("/floor",
    async (req, res) => {
        const { name, id, map } = req.body;
        const officeId = mongoose.Types.ObjectId(id);

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

server.post("/office",
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

server.delete("/office/:id", async (req, res) => {
    Office.deleteOne({ _id: req.params.id }).then(response => {
        if (response.deletedCount == 0) {
            res.status(401).json({
                message: "Office not deleted",
            });
        } else {
            res.status(200).json({
                message: "Delete successfully",
            })
        }
    })
});

server.delete("/workdesk/:id", async (req, res) => {
    WorkDesk.deleteOne({ _id: req.params.id }).then(response => {
        if (response.deletedCount == 0) {
            res.status(401).json({
                message: "Workdesk not deleted",
            });
        } else {
            res.status(200).json({
                message: "Delete successfully",
            })
        }
    })
});

server.delete("/floor/:id", async (req, res) => {
    Floor.deleteOne({ _id: req.params.id }).then(response => {
        if (response.deletedCount == 0) {
            res.status(401).json({
                message: "Floor not deleted",
            });
        } else {
            res.status(200).json({
                message: "Delete successfully",
            })
        }
    })
});

server.get("/floor", async (req, res) => {
    const { name } = req.query;
    const office = await Office.findOne({ name });
    const floor = await Floor.find({ officeId: office._id });

    if(!floor) {
        res.status(404).json({
            message: "Floor not found",
        });
    } else {
        res.status(200).json({
            message: "Get floors successfully",
            floor
        })
    }
});

server.get("/workdesk", async (req, res) => {
    const { name } = req.query;
    const floor = await Floor.findOne({ name });
    const workdesk = await WorkDesk.find({ floorId: floor._id })

    if(!workdesk) {
        res.status(404).json({
            message: "Workdesk not found",
        });
    } else {
        res.status(200).json({
            message: "Get workdesk successfully",
            workdesk
        })
    }
});

server.get("/office", async (req, res) => {
    const office= await Office.find()

    if(!office) {
        res.status(404).json({
            message: "Office not found",
        });
    } else {
        res.status(200).json({
            message: "Get office successfully",
            office
        })
    }
});

module.exports = server;