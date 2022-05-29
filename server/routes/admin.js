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
const auth = require('../middleware/auth');

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

server.post("/workdesk", auth,
    async (req, res) => {
        const { x, y, floorId } = req.body;
        const _floorId = mongoose.Types.ObjectId(floorId);

        const work = {
            x,
            y,
            floorId: _floorId
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

server.post("/floor", upload.single('image'), async (req, res) => {
    const { name, id, mapName } = req.body;
    const obj = {
        name: req.body.mapName,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join("D:/Poli/iTEC" + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    const officeId = mongoose.Types.ObjectId(id);

    const floor = {
        name,
        officeId,
        map: mapName
    };

    const floorReq = await Floor.findOne({ name });

    if (!floorReq) {
        await Floor.create(
            floor
        ).then(floor => {
            imgModel.create(obj, (err, item) => {
                if (err) {
                    console.log(err);
                }
                else {
                    item.save();
                    //res.redirect('/');
                }
            });

            res.status(200).json({
                message: "Floor successfully created",
                floor,
            })
        }
        )
    } else {
        res.status(401).json({
            message: "Floor not created",
        });
    }
}
);

server.post("/office", auth,
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

server.post("/image", auth, upload.single('image'), (req, res) => {
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


server.get('/image', auth, (req, res) => {
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


server.delete("/office/:id", auth, async (req, res) => {
    console.log(req.params.id)
    Office.deleteOne({ _id: req.params.id }).then(response => {
        Floor.deleteMany({ officeId: req.params.id }).then(res => {
            console.log(res)
        })
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

server.delete("/workdesk/:id", auth, async (req, res) => {
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

server.delete("/floor/:id", auth, async (req, res) => {

    WorkDesk.find({ floorId: mongoose.Types.ObjectId(req.params.id) }).then(response => {
        WorkDesk.deleteMany({ floorId: mongoose.Types.ObjectId(req.params.id) }).then(res => {
        })
    })

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


server.get("/floor", auth, async (req, res) => {
    const { name } = req.query;
    if (name) {
        const office = await Office.findOne({ name });
        if (office) {
            const floor = await Floor.find({ officeId: office._id });

            if (!floor) {
                res.status(404).json({
                    message: "Floor not found",
                });
            } else {
                res.status(200).json({
                    message: "Get floors successfully",
                    floor
                })
            }
        }
        else{
            res.status(404).json({ message: "Name not provided" })
        }
    }
    else {
        res.status(404).json({ message: "Name not provided" })
    }
});

server.get("/workdesk", auth, async (req, res) => {
    const { _id } = req.query;
    // console.log("🚀 ~ file: admin.js ~ line 242 ~ server.get ~ name", _id)
    const floor = await Floor.findOne({ _id });
    if(floor){
    const workdesk = await WorkDesk.find({ floorId: floor._id })
    if (!workdesk) {
        res.status(404).json({
            message: "Workdesk not found",
        });
    } else {
        res.status(200).json({
            message: "Get workdesk successfully",
            workdesk
        })
    }
}
else{
    res.status(404).json({
        message: "Floor does not exist"
    });
}
});

server.get("/office", auth, async (req, res) => {
    const office = await Office.find()

    if (!office) {
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