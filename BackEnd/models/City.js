const db = require('mongoose');

const citySchema = new db.Schema({
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    commun_id: {type: db.Schema.Types.ObjectId, ref: 'Community', required: true},
    consumption: {type: Number, default: 0},
})

const City = db.model('City', citySchema);
module.exports = City;