const mongoose = require('mongoose');
const { Schema } = mongoose;

const FotoSchema = new Schema({
    empleado:{type:String},
    nombre:{type:String},
    usuario:{type:String}
});

module.exports = mongoose.model('Foto',FotoSchema);