const mongoose = require('mongoose');
const path = require('path');
const {Schema} = mongoose;

const BajaSchema = new Schema({
    nombre:{type: String},
    apellido:{type: String},
    fecha:{type: Date,default: Date.now},
    user:{type:String}
});
module.exports = mongoose.model('Baja', BajaSchema);