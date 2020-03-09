const path = require('path');
const fs = require('fs-extra');
const Foto = require('../modelos/Foto');
class FotoS {
    constructor() {
    }

    async update(originalname,ruta,size,id) {
        try {
            const imgURL = this.random();
            const extencion = path.extname(originalname).toLowerCase();
            const temporal = ruta;
            const tamaño = size;
            const obtener = await Foto.findOne({ _id: id });
            const targetPath = path.resolve(`src/public/img/${imgURL}${extencion}`);
            const borrar = path.resolve(`src/public/img/${obtener.nombre}`);
            if (extencion != '.jpg' && extencion != '.png' && extencion != '.jpeg') {
                await fs.unlink(temporal);
                return 'Formato de imagen no valido';
            } else if (tamaño > 2000000) {
                await fs.unlink(temporal);
                return 'La imagen no debe superar los 2 MB';
            }
            else {
                if (obtener.nombre == 'foto.jpg') {
                    await fs.rename(temporal, targetPath);
                    await Foto.findByIdAndUpdate(id, { nombre: imgURL + extencion });
                    return 'Imagen actualizada con exito';
                } else {
                    await fs.unlink(borrar);
                    await fs.rename(temporal, targetPath);
                    await Foto.findByIdAndUpdate(id, { nombre: imgURL + extencion });
                    return 'Imagen actualizada con exito'
                }
    
            }
        } catch (e) {
            return e;
        }
    }

    random() {
        const possible = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789';
        var randomNumber = 0;
        for (let i = 0; i < 10; i++) {
            randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return randomNumber;
    }

    async obtener(id){
        const ob = await Foto.find({empleado:id});
        return ob;
    }
}
module.exports = FotoS;