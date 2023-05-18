const mongoose = require('mongoose');


const imageSchema = mongoose.Schema({
    title: {type: String, required:true},
    pic: { 
        type: String,
        required:true,
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },    
    },
    { timestamps:true,}
)

const Image = mongoose.model("Image", imageSchema)
module.exports = Image