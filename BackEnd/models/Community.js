const db = require('mongoose');

const communitySchema = new db.Schema({
    name: {type: String, required: true, unique: true},
    consumption: {type: Number, default: 0},
})

const Community = db.model('Community', communitySchema);
module.exports = Community;