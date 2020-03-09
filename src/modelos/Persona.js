const mongoose = require('mongoose');
const path = require('path');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const PersonaSchema = new Schema({
    nombre:{type:String},
    noum:{type:String},
    apellido:{type:String},
    cargo:{type:String},
    huella:{type:String},
    user:{type:String}
});

PersonaSchema.methods.encryptPassword = async (huella) => {
    const salt = await bcrypt.genSalt(15);
    const hash = bcrypt.hash(huella, salt);
    return hash;
};

PersonaSchema.methods.matchPassword = async function (huella) {
    return await bcrypt.compare(huella, this.huella);
};
module.exports = mongoose.model('Persona', PersonaSchema);