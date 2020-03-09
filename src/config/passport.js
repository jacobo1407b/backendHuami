const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;
const User = require('../modelos/User');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'nombre',
    session: false
}, async (nombre, password, done) => {
    console.log("ejecutando *callback verify* de estategia local");
    const user = await User.findOne({ nombre: nombre });
    if (!user) {
        return done(null, false);
    }  //cuando  no existe
    else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false);
        } //no coincide la password
        //login ok
    }
}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'yoursecret';//process.env.JWT_SECRET;
opts.algorithms = 'HS256';//[process.env.JWT_ALGORITHM];

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("ejecutando callback verificacion de estategia jwt");
    User.findOne({ _id: jwt_payload.sub })
        .then(data => {
            if (data === null) { //no existe el usuario
                //podríamos registrar el usuario
                return done(null, false);
            }
            else
                return done(null, data);
        })
        .catch(err => done(err, null)) //retornar error
}));

