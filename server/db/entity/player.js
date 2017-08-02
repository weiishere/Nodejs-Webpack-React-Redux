const mongoose = require('mongoose');


const playerSchema = new mongoose.Schema({
    //_id: Schema.Types.ObjectId,  //主键
    name: String,
    birthday: Date,
    height: Number,
    weight: Number,
    club: String,
    position: String,
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;