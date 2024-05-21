const Producto = require("../Clases/Producto.js");
const Tienda = require("../Clases/Tienda.js");
const mysql = require("mysql2")
const  {BD_HOST, BD_USER, BD_PASSWORD, BD_NAME, BD_PORT} = require("./../../config.js");

class Crud{
    constructor(){
        this.conexion = mysql.createConnection({
            host : BD_HOST,
            user : BD_USER,
            password : BD_PASSWORD,
            database : BD_NAME,
            port: BD_PORT
        });
        
        this.conexion.connect((err)=>{
            if(err){console.log(err);}
        });
    }

    async obtenerIdDistribuidora(nombre){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT gru_id FROM distribuidoras WHERE gru_grupo = ?;", [nombre], (error, result)=>{
                if(error){reject(0)}
                let id = result[0].gru_id;
                resolve(id);
            });
        });
    }

    async obtenerIdTipo(nombre){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT mat_id FROM tipos WHERE mat_materia = ?;", [nombre], (error, result)=>{
                if(error){reject(0)}
                resolve(result[0].mat_id);
            });
        });
    }

    async obtenerNombreDistribuidora(id){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT gru_grupo FROM distribuidoras WHERE gru_id = ?;", [id], (error, result)=>{
                if(error){reject(0)}
                let id = result[0].gru_grupo;
                resolve(id);
            });
        });
    }

    async obtenerNombreTipo(id){
        return await new Promise((resolve, reject) => {
            this.conexion.query("SELECT mat_materia FROM tipos WHERE mat_id = ?;", [id], (error, result)=>{
                if(error){reject(0)}
                resolve(result[0].mat_materia);
            });
        });
    }

    async obtenerIdSiguiente(columna, tabla){
        return await new Promise((resolve, reject) => {
            this.conexion.query(`SELECT ${columna} FROM ${tabla} ORDER BY (${columna}) ASC;`, (error, result)=>{
                if(error){reject(0)}
                let id = 1;
                for(let i = 0; i < result.length; i++){
                    if(id !== result[i][columna]){
                        break;
                    }
                    id++;
                }
                
                resolve(id);
            });
        });
    }

    async obtenerTiendas(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT tienda.pro_id, tienda.pro_nombre, tienda.pro_edad, distribuidoras.gru_grupo, tipos.mat_materia FROM tienda INNER JOIN tipos INNER JOIN distribuidoras WHERE distribuidoras.gru_id = tienda.gru_id AND tipos.mat_id = tienda.mat_id ORDER BY (tienda.pro_nombre) ASC;", (error, result)=>{
                if(error){
                    reject([]);
                }

                let profes = [];
                for(let i = 0; i < result.length; i++){
                    let fila = result[i];
                    profes.push(new Tienda(fila.pro_nombre, fila.pro_edad, fila.gru_grupo, fila.mat_materia, fila.pro_id));
                }

                resolve(profes);
            });
        });
    }

    async obtenerProductos(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT producto.alu_boleta, producto.alu_nombre, producto.alu_edad, distribuidoras.gru_grupo FROM producto INNER JOIN distribuidoras WHERE producto.gru_id = distribuidoras.gru_id ORDER BY (producto.alu_nombre) ASC;", (error, result)=>{
                if(error){
                    reject([]);
                }
                
                let estudiantes = [];
                for(let i = 0; i < result.length; i++){
                    let estudiante = result[i];
                    estudiantes.push(new Producto(estudiante.alu_nombre, estudiante.alu_edad, estudiante.alu_boleta, estudiante.gru_grupo));
                }

                resolve(estudiantes);
            });
        });
    }

    async agregarTienda(profesor){
        let id = await this.obtenerIdSiguiente("pro_id", "tienda");
        return await new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO tienda VALUES(?, ?, ?, ?, ?);", [id, profesor.getNombre, profesor.getEdad, profesor.getDis, profesor.getTipo], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async agregarProducto(alumno){
        let id = await this.obtenerIdSiguiente("alu_id", "producto");
        let idGrupo = await this.obtenerIdDistribuidora(alumno.getDis);
        return await new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO producto VALUES(?, ?, ?, ?, ?);", [id, id, alumno.getNombre, alumno.getEdad, idGrupo], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async actualizarTienda(profesor){
        let idMateria = await this.obtenerIdTipo(profesor.getTipo);
        let idGrupo = await this.obtenerIdDistribuidora(profesor.getDis);

        return await new Promise((resolve, reject)=>{
            this.conexion.query("UPDATE tienda SET pro_nombre = ?, pro_edad = ?, gru_id = ?, mat_id = ? WHERE pro_id = ?;", [profesor.getNombre, profesor.getEdad, idGrupo, idMateria, profesor.getIdentificador], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async actualizarProducto(alumno){
        let idGrupo = await this.obtenerIdDistribuidora(alumno.getDis);
        return await new Promise((resolve, reject)=>{
            this.conexion.query("UPDATE producto SET alu_nombre = ?, alu_edad = ?, gru_id = ? WHERE alu_boleta = ?;", [alumno.getNombre, alumno.getEdad, idGrupo, alumno.getId], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async borrarTienda(id){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("DELETE FROM tienda WHERE pro_id = ?;", [id], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async borrarProducto(boleta){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("DELETE FROM producto WHERE alu_boleta = ?;", [boleta], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async insertarDistribuidora(grupo){
        let id = await this.obtenerIdSiguiente("gru_id", "distribuidoras");
        return new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO distribuidoras VALUES(?, ?);", [id, grupo], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async insertarTipo(materia){
        let id = await this.obtenerIdSiguiente("mat_id", "tipos");
        return new Promise((resolve, reject)=>{
            this.conexion.query("INSERT INTO tipos VALUES(?, ?);", [id, materia], (error, result)=>{
                if(error){
                    console.log(error); 
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    async obtenerDistribuidora(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT gru_grupo FROM distribuidoras;", (error, result)=>{
                if(error){
                    console.log(error); 
                    reject([]);
                }
                
                let grupos = [];
                for(let i = 0; i< result.length; i++){
                    grupos.push(result[i].gru_grupo);
                }

                resolve(grupos);
            });
        });
    }

    async obtenerTipos(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT mat_materia FROM tipos;", (error, result)=>{
                if(error){
                    console.log(error); 
                    reject([]);
                }
                
                let materias = [];
                for(let i = 0; i< result.length; i++){
                    materias.push(result[i].mat_materia);
                }

                resolve(materias);
            });
        });
    }

    async obtenerRelaciones(){
        return await new Promise((resolve, reject)=>{
            this.conexion.query("SELECT distribuidoras.gru_grupo, tienda.pro_nombre, tipos.mat_materia FROM tienda INNER JOIN distribuidoras INNER JOIN tipos WHERE tienda.gru_id = distribuidoras.gru_id AND tipos.mat_id = tienda.mat_id ORDER BY (gru_grupo) ASC;", (error, result)=>{
                if(error){
                    console.log(error);
                    reject([]);
                }

                let horarios = [];
                for(let i = 0; i< result.length; i++){
                    horarios.push({grupo: result[i].gru_grupo, nProfesor: result[i].pro_nombre, materia: result[i].mat_materia});
                }
                
                resolve(horarios);
            });
        });
    }
}

module.exports = Crud;