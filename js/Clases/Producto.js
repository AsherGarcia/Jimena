const Objeto = require("./Objeto.js");

class Producto extends Objeto{
    constructor(nombre, edad, id, dis){
        super(nombre, edad);
        this.id = id;
        this.dis = dis;
    }

    get getId(){
        return this.id;
    }

    set setId(id){
        this.id = id;
    }

    get getDis(){
        return this.dis;
    }

    set setDis(dis){
        this.dis = dis;
    }
}

module.exports = Producto;