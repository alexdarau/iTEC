const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FloorSchema = new Schema({
    name: {
        type: String
    },

    officeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office"
    },

    map: {
        type: String
    }
});

const Floor = mongoose.model('Floor', FloorSchema, 'Floor');

module.exports = Floor;
