const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    name: {
        type: String
    }
});

const Office = mongoose.model('Office', OfficeSchema, 'Office');

module.exports = Office;
