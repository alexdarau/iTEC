const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkDeskSchema = new Schema({
    x: {
        type: Number
    },

    y: {
        type: Number
    },

    floorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor"
    }
});

const WorkDesk = mongoose.model('WorkDesk', WorkDeskSchema, 'WorkDesk');
module.exports = WorkDesk;
