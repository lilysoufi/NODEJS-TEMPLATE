const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

       description: {
        type: String,
        maxlength: 200,
        default: ''
    },
})

module.exports = mongoose.model('Room' , RoomSchema)