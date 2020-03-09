//instancias
const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Pago } = require('../ayudantes/pago');
//clase
const usuario = require('../class/usuario');
//manejador de errores
const error_types = require('../ayudantes/error_types');
//para protejer las rutas
const customMdw = require('../ayudantes/auth');

router.get('/', (req, res) => {
    //res.json({'estado':'hola mundo'});
    res.send('hola mundo');
});
router.post('/login', function (req, res, next) {
    passport.authenticate('local', { session: false }, function (error, user, info) {
        if (error || !user) {
            next(new error_types.Error404("username or password not correct."))
        } else {
            console.log("*** comienza generacion token*****");
            const payload = {
                sub: user._id,
                exp: Date.now() + parseInt(43200),
                username: user.nombre
            };
            const token = jwt.sign(JSON.stringify(payload), 'yoursecret', { algorithm: 'HS256' });
            res.json({ data: { token: token } });

        }
    })(req, res, next);
});

router.post('/api/registro/user', async (req, res) => {
    const { nombre, apellidos, password, confirma } = req.body;
    let us = new usuario();
    let val = await us.validar(nombre, apellidos, password, confirma);
    if(val == true){
        let reg = await us.registrar(nombre,apellidos,password);
        res.json({reg})
    }else{
        res.json({error:val});
    }
});

router.post('/api/consultar', async (req, res) => {
    const { huella } = req.body;
    let Usu = new usuario();
    let enviar = await Usu.encontrar(huella);
    res.json({'estado':enviar})
});
router.get('/api/borrados', customMdw.ensureAuthenticated, async (req, res)=>{
    let Usu = new usuario();
    let consulta = await Usu.borrados(req.user.id);
    res.json({'estado':consulta})
});
router.get('/api/entradas', customMdw.ensureAuthenticated, async (req, res)=>{
    let Usu = new usuario();
    let consulta = await Usu.entradas(req.user.id);
    res.json({'estado':consulta})
});
/*
router.post('/api/pago/:id', customMdw.ensureAuthenticated, async (req,res)=>{
    const datosId = await Persona.findOne({_id:req.params.id});
    const sal = await End.findOne({idper:datosId._id})

    var ingresoDatos = new Pago(datosId.nombre,datosId.apellido)
});*/
/*
router.get('/logout', (req, res) => {
    req.logout();
    res.json({'d':'d'});
});*/
module.exports = router;

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZTUwMzAwNWQyMjEyYzM1ODA3MDMyMDciLCJleHAiOjE1ODI3NDkzOTA4OTEsInVzZXJuYW1lIjoiSm9zZSBQYWJsbyJ9.OlOt1bwYiENaQe_caiMWtopNQZbxhxcwhJh9uRNhLKQ
