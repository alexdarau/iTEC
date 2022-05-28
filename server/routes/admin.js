var express = require("express");
var imgModel = require('../models/image');
const WorkDesk = require("../models/workdesk");
const Floor = require("../models/floor")
const Office = require("../models/office");
const id = require("faker/lib/locales/id_ID");
const server = express();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });
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

server.post("/image", upload.single('image'), (req, res) => {
  console.log(req.file.filename)
  console.log(__dirname)
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join("D:/Poli/iTEC" + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log("🚀 ~ file: admin.js ~ line 114 ~ server.post ~ obj", obj)
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
});


server.get('/image', (req, res) => {
	imgModel.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
			res.status(200).json({ items: items });
		}
	});
});


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