const db = require('mongoose');

const addressSchema = new db.Schema({
    name: {type: String, required: true},
    house: {type: Number, required: true},
    apartment: {type: Number, default: null},
    city_id: {type: db.Schema.Types.ObjectId, ref: 'City', required: true},
    consumption: {type: Number, default: 0},
})

const Address = db.model('Address', addressSchema);
module.exports = Address;