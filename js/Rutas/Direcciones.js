const Controlador = require("./Controlador.js");

class Rutas{    
    constructor(app){
        this.app = app;
        this.controlador = new Controlador();
    }

    agregarMetodos(){
        this.app.use("/obtenerProductos", (req, res)=>{this.controlador.obtenerProductos(req, res)});
        this.app.use("/obtenerTiendas", (req, res)=>{this.controlador.obtenerTiendas(req, res)});
        this.app.use("/obtenerDistribuidoras", (req, res)=>{this.controlador.obtenerDistribuidoras(req, res)});        
        this.app.use("/obtenerTipos", (req, res)=>{this.controlador.obtenerTipos(req, res)});
        this.app.use("/obtenerRelaciones", (req, res)=>{this.controlador.obtenerRelaciones(req, res)});
        
        this.app.post("/opcionesT", (req, res)=>{this.controlador.opcionesT(req, res)});
        this.app.post("/ingresarGrupo", (req, res)=>{this.controlador.ingresarDistribuidora(req, res)});
        this.app.post("/ingresarProducto", (req, res)=>{this.controlador.ingresarProducto(req, res)});
        this.app.post("/ingresarTienda", (req, res)=>{this.controlador.ingresarTienda(req, res)});
        this.app.post("/ingresarTipo", (req, res)=>{this.controlador.ingresarTipo(req, res)});       
        this.app.post("/modificarT", (req, res)=>{this.controlador.modificarT(req, res)});
        this.app.post("/modificarP", (req, res)=>{this.controlador.modificarP(req, res)});
        this.app.post("/opcionesP", (req, res)=>{this.controlador.opcionesP(req, res)});
    }
}

module.exports = Rutas;