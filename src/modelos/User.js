const mongoose = require('mongoose');
const path = require('path');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre:{type: String},
    apellidos:{type: String},
    password:{type:String}
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);