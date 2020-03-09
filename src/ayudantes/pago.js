class Pago{
    constructor(persona,apellidos,horas){
        this.persona=persona;
        this.apellidos=apellidos;
        this.horas=horas;
        this.precio=50;
    }

    calcular(){
        var total=0;
        total=this.horas*this.precio;
        return total;
    }
    personaPago(){
        var nombre=this.persona+' '+ this.apellidos;
        return nombre;
    }
}

module.exports = Pago;