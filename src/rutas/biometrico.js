//instancias
const express = require('express');
const router = express.Router();
//esquemas mongo
const Persona = require('../modelos/Persona');
const Baja = require('../modelos/Baja');
const User = require('../modelos/User');
const Foto = require('../modelos/Foto');
//para protejer las rutas
const customMdw = require('../ayudantes/auth');
const Foro = require('../class/foto');

router.get('/api/obtener/personas', customMdw.ensureAuthenticated, async (req, res) => {
    const people = await Persona.find({ user: req.user.id });
    res.json({ people })
});

router.get('/api/obtener/personas/:id', customMdw.ensureAuthenticated, async (req, res) => {
    const people = await Persona.findById({ _id: req.params.id });
    res.json({ people })
});

router.put('/api/update/:id', customMdw.ensureAuthenticated, async (req, res) => {
    const { nombre, apellido, cargo } = req.body;
    try {
        if (!nombre || !apellido || !cargo) {
            res.json({ estado: 'llena todos los datos' });
            return false;
        } if (nombre.length > 40 || apellido.length > 90 || cargo.length > 30) {
            res.json({ estado: 'datos muy largos' });
            return false;
        } else {
            await Persona.findByIdAndUpdate(req.params.id, { nombre, apellido, cargo });
            res.json({ estado: 'Actualizado' });
        }
    } catch (e) {
        res.json({ estado: e })
    }
});

router.delete('/api/delete/:id', customMdw.ensureAuthenticated, async (req, res) => {
    try {
        const eliminado = await Persona.findById(req.params.id);
        const nombre = eliminado.nombre;
        const apellido = eliminado.apellido
        await Persona.findByIdAndDelete(req.params.id);
        const borrado = new Baja({ nombre, apellido });
        borrado.user = req.user.id;
        await borrado.save();
        res.json({ estado: 'eliminado con exito' });
    } catch (e) {
        res.json({ estado: e });
    }

});
router.post('/api/registro/persona', customMdw.ensureAuthenticated, async (req, res) => {
    const { nombre, apellido, cargo, huella, noum } = req.body;
    const errores = [];
    if (!nombre || !apellido || !cargo || !noum) {
        errores.push({ text: 'campos vacios' });
    } if (nombre.length > 50 || apellido.length > 50) {
        errores.push({ text: 'Nombre y contraseña no validos' });
    } if (errores.length > 0) {
        res.json({
            'error': true,
            'errores': errores
        });
    } else {
        const datos = new Persona({ nombre, apellido, cargo, huella, noum });
        datos.user = req.user.id;
        // datos.huella = await datos.encryptPassword(huella);
        await datos.save();
        const saberId = await Persona.findOne({ noum });
        const empleado = saberId._id;
        const newfoto = new Foto({ empleado, nombre: 'foto.jpg', usuario: req.user.id });
        await newfoto.save();
        res.json({
            'error': false,
            "estado": 'exito'
        });
    }
});

module.exports = router;