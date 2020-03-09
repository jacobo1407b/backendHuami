const mongoose = require('mongoose');
const path = require('path');
const {Schema} = mongoose;

const EndSchema = new Schema({
    nombre:{type: String},
    apellido:{type:String},
    fecha:{type: Date,default: Date.now},
    idper:{type:String},
    user:{type:String}
});
module.exports = mongoose.model('End', EndSchema);