const bodyParser = require("body-parser");
const express = require("express");
const Rutas = require("./js/Rutas/Direcciones.js");
const {PORT}= require("./config.js");

const puerto = PORT;
const url = 'http://localhost:'+puerto+'/';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
})); 
app.use(express.static("public"));

new Rutas(app).agregarMetodos();

app.listen(puerto ,()=>{
    console.log(`Servidor escuchando en ${url}`);
});