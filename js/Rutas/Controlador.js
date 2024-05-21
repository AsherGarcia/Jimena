const Crud = require("./../Crud/Crud.js");
const Generar = require("../Extras/render.js");
const Tienda = require("../Clases/Tienda.js");
const Producto = require("../Clases/Producto.js");

class Controlador{
    constructor(){
        this.crud = new Crud();
        this.generar = new Generar();
    }

    async obtenerProductos(req, res){
        res.send(this.generar.generarTablaProductos(await this.crud.obtenerProductos(), await this.crud.obtenerDistribuidora()));
    }

    async obtenerTiendas(req, res){
        res.send(this.generar.generarTablaTiendas(await this.crud.obtenerTiendas(), await this.crud.obtenerDistribuidora(), await this.crud.obtenerTipos()));
    }

    async ingresarDistribuidora(req, res){
        let grupo = req.body.grupo;
        await this.crud.insertarDistribuidora(grupo);
        res.redirect("/obtenerDistribuidoras");
    }

    async ingresarTipo(req, res){
        let materia = req.body.materia;
        await this.crud.insertarTipo(materia);
        res.redirect("/obtenerTipos");
    }

    async ingresarProducto(req, res){
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let boleta = 0;
        let grupo = req.body.grupo;

        try{
            parseInt(edad);

            if(grupo.length > 3 && edad > 0 && nombre.length > 3){
                await this.crud.agregarProducto(new Producto(nombre, edad, boleta, grupo));
            }
        }
        catch(err){
            console.log(err);
        }
        res.redirect("/obtenerProductos");
    }

    async obtenerDistribuidoras(req, res){
        res.send(this.generar.generarFormularioDistribuidoras(await this.crud.obtenerDistribuidora()));
    }

    async obtenerTipos(req, res){
        res.send(this.generar.generarFormularioTipos(await this.crud.obtenerTipos()));
    }

    async ingresarTienda(req, res){
        let nombre = req.body.nombre;
        let edad = parseInt(req.body.edad);
        let materia = await this.crud.obtenerIdTipo(req.body.materia);
        let grupo = await this.crud.obtenerIdDistribuidora(req.body.grupo);
        
        try{
            parseInt(edad);

            if(edad > -1 && materia.length > 3 && nombre.length > 0 && grupo.length > 3){
                await this.crud.agregarTienda(new Tienda(nombre, edad, grupo, materia, 0));
            }
        }        
        catch(err){
            console.log(err);
        }

        res.redirect("/obtenerTiendas");
    }

    async opcionesT(req, res){
        let accion = req.body.accion;
        let id = req.body.id;
        let profesorActualizar;
        let profesores = await this.crud.obtenerTiendas();

        try{
            profesores.forEach(profesor => {
                if(profesor.getIdentificador === parseInt(id)){
                    profesorActualizar = profesor;
                }   
            });

            if(accion === "Modificar"){
                parseInt(id);
                if(id > 0){
                    res.send(this.generar.mostrarTienda(profesorActualizar, await this.crud.obtenerTipos(), await this.crud.obtenerDistribuidora()));
                }
            }
            else if(accion === "Eliminar"){
                await this.crud.borrarTienda(id);
                res.redirect("/obtenerTiendas");
            }
        }
        catch(err){

        }
    }

    async opcionesP(req, res){
        let accion = req.body.accion;
        let boleta = req.body.boleta;
        let alumnoActualizar;
        let alumnos = await this.crud.obtenerProductos();

        alumnos.forEach(alumno => {
            if(alumno.getId === boleta){
                alumnoActualizar = alumno;
            }   
        });

        if(accion === "Modificar" && alumnoActualizar !== undefined && alumnoActualizar !== null){
            res.send(this.generar.mostrarProducto(alumnoActualizar, await this.crud.obtenerDistribuidora()));
        }
        else if(accion === "Eliminar"){
            await this.crud.borrarProducto(boleta);
            res.redirect("/obtenerProductos");
        }
    }

    async modificarT(req, res){
        let id = req.body.id;
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let materia = req.body.materia;
        let grupo = req.body.grupo;
        
        try{
            parseInt(id);
            parseInt(edad);

            if(grupo.length > 3 && materia.length > 3 && edad > -1 && nombre.length > 0 && id > 0){
                await this.crud.actualizarTienda(new Tienda(nombre, edad, grupo, materia, id));
            }
        }
        catch(err){
            console.log(err)
        }

        res.redirect("/obtenerTiendas");
    }
 
    async modificarP(req, res){
        let boleta = req.body.boleta;
        let nombre = req.body.nombre;
        let edad = req.body.edad;
        let grupo = req.body.grupo;
        
        try{
            parseInt(edad);
            if(grupo.length > 3 && edad > -1 && nombre.length > 0){
                await this.crud.actualizarProducto(new Producto(nombre, edad, boleta, grupo));
            }
        }
        catch(err){
            console.log(err)
        }
        

        res.redirect("/obtenerProductos");
    }

    async obtenerRelaciones(req, res){
        res.send(this.generar.generarTablaRelaciones(await this.crud.obtenerRelaciones()));
    }
}

module.exports = Controlador;