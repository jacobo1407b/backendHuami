const express = require('express');
const router = express.Router();
const customMdw = require('../ayudantes/auth');
const foto = require('../class/foto');

router.put('/api/registrar/foto/:id', customMdw.ensureAuthenticated, async(req,res)=>{
   /* const {originalname,path,size}=req.file
    let fotoEmple = new foto();
    let enviar = await fotoEmple.update(originalname,path,size,req.params.id);
    res.json({estado:enviar})*/
    console.log(req.file)
});

router.get('/api/obtener/img/:id', customMdw.ensureAuthenticated, async (req,res)=>{
    let fotoEmple = new foto();
    let respuesta = await fotoEmple.obtener(req.params.id);
    res.json({estado:respuesta});
});

module.exports = router;