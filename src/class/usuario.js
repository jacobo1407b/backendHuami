const User = require('../modelos/User');
const Persona = require('../modelos/Persona');
const End = require('../modelos/End');
const Baja = require('../modelos/Baja');


class user{
    constructor(){
    }


    async registrar(nombre,apellidos,password){
        try{
            const Nuevo = new User({ nombre, apellidos });
        Nuevo.password = await Nuevo.encryptPassword(password);
        await Nuevo.save();
        return 'exito';
        }catch(e){
            return e;
        }
    }

    async validar(nombre, apellidos, password, confirma){
        const saber = await User.findOne({nombre})
        if (!nombre || !apellidos || !password || !confirma) {
            return 'Campos vacios';
         } if (password != confirma) {
             return 'Los password no coinciden';
         } if (nombre.length > 100 && apellidos.length > 100) {
             return 'Datos muy largos';
         } if (password.length < 6 || password.length > 20 || confirma.length < 6 || confirma.length > 20) {
             return 'El password debe tener entre 6 y 20 caracteres'
         } if(saber){
             return 'Nombre en uso';
         }
         return true;
    }


    async borrados(usuario){
        try{
            const eliminados = await Baja.find({user: usuario});
            return eliminados;
        }catch(e){
            return 'Error en servidor';
        }
    }

    async entradas(usuario){
        try{
            const gestion = await End.find({user: usuario});
            return gestion;
        }catch(e){
            console.log(e)
            return 'Error en el servidor';
        }
    }

    async encontrar(huella){
        const encontrado = await Persona.find({'huella': {'$regex': huella}})
        console.log(encontrado);
        if (encontrado[0] != undefined || encontrado[0]!=null) {
            const {user, nombre, apellido,_id}= encontrado[0];
            const guardar = new End({nombre,user,apellido,idper:_id});
            await guardar.save();
            return true;
        } else {
            return false;
        }
    }
}

module.exports = user;