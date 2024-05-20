const Objeto = require("./Objeto.js");

class Tienda extends Objeto{
    constructor(nombre, edad, dis, tipo, identificador){
        super(nombre, edad);
        this.dis = dis;
        this.tipo = tipo;
        this.identificador = identificador;
    }

    get getDis(){
        return this.dis;
    }

    set setGrupo(dis){
        this.dis = dis;
    }

    get getTipo(){
        return this.tipo;
    }

    set setTipo(tipo){
        this.tipo = tipo;
    }

    get getIdentificador(){
        return this.identificador;
    }

    set setidentificador(identificador){
        this.identificador = identificador;
    }
}

module.exports = Tienda;