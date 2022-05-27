const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    officeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Office"
    },

    floorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floor"
    },
    
   workdeskId: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "WorkDesk"
   }
});

const Location = mongoose.model('Location', LocationSchema, 'Location');

module.exports = Location;
