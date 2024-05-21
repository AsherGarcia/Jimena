class Generar{
    constructor(){}

    generarEstructuraHtml(body = "", titulo = ""){
        return `<html lang='es'>
            <head>
                <title>${titulo}</title>
                <link rel="stylesheet" href="./css/style.css">
            </head>
            <body>
                <div class='flex-container'>
                    ${body}
                </div>
            </body>
        </html>`;
    }

    generarTablaProductos(alumnos, grupos){
        let filas = "", gruposDis = "";;
        for(let i = 0; i < alumnos.length; i++){
            let alumno = alumnos[i];
            filas += `<tr>
                    <td>${alumno.getId}</td>
                    <td>${alumno.getNombre}</td>
                    <td>${alumno.getEdad}</td>
                    <td>${alumno.getDis}</td>
                    <td>
                        <form action='/opcionesP' method='POST'>
                            <input type='hidden' name='boleta' value='${alumno.getId}'>
                            <input type='submit' name='accion' class='btModificar' value='Modificar'>
                            <input type='submit' name='accion' class='btEliminar' value='Eliminar'>
                        </form>
                    </td>
                </tr>`;
        }

        for(let i = 0; i < grupos.length; i++){
            gruposDis += `<option value='${grupos[i]}'>${grupos[i]}</option>`;            
        }

        let tabla = `
        <h2 align='center'>Registros de Productos<h2>
        <table>
            <tr>
                <td>Identificador</td>
                <td>Producto</td>
                <td>Piezas</td>
                <td>Distribuidora</td>
                <td>Acciones</td>
            </tr>
            <tr>
                ${filas}
            </tr>
        </table>
        `;

        let formulario = `<br><form align='center' action='/ingresarProducto' method='POST'>
     
            <p>Para registrar un producto llena los siguientes campos:</p>
            <br>
            <input type='text' minlength='3' name='nombre' placeholder='Nombre del producto' required>
            <br>
            <input type='number' min='0' name='edad' placeholder='Piezas disponibles' required>
            <bR>
            <select name='grupo'>
                ${gruposDis}
            </select>
            <br>
            <input type='submit' class='btnAccion' value='Agregar Producto'>
        </form>
        <br>
        <button class='btRegresar'><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(`<div class='container2'>${formulario}</div><div class='container1'>${tabla}</div>`, "Tabla de Alumnos")
    }

    generarTablaTiendas(profesores, grupos, materias){
        let filas = "", gruposDis = "", materiasDis = "";

        for(let i = 0; i < profesores.length; i ++){
            let profesor = profesores[i];
            filas += `<tr>
                <td>${profesor.getNombre}</td>
                <td>${profesor.getTipo}</td>
                <td>${profesor.getDis}</td>
                <td>
                    <form action='/opcionesT' method='POST'>
                        <input type='hidden' name='id' value='${profesor.getIdentificador}'>
                        <input type='submit' name='accion' class='btModificar' value='Modificar'>
                        <input type='submit' name='accion' class='btEliminar' value='Eliminar'>
                    </form>
                </td>
            </tr>`;
        }

        for(let i = 0; i < grupos.length; i ++){
            gruposDis += `<option value='${grupos[i]}'>${grupos[i]}</option>`;
        }

        for(let i = 0; i < materias.length; i ++){
            materiasDis += `<option value='${materias[i]}'>${materias[i]}</option>`;
        }

        let tabla = `<table>
            <tr>
                <td>Nombre de la tienda</td>
                <td>Tipo de tienda</td>
                <td>Distribuidora</td>
                <td>Acciones</td>
            </tr>
            ${filas}
        </table>
        <br>`;

        let formulario= `<br><form align='center' action='/ingresarTienda' method='POST'>
            <p>Registra aqui el nombre de la tienda:</p>
            <input type='text' minlength='3' name='nombre' placeholder='Nombre de la tienda' required>
            <br>
            <input type='number' min='0' name='edad' placeholder='Años activa Ej.(1, 0.5medio año)' required>
            <br>
            <select name='grupo' required>
                ${gruposDis}
            <select>
            <br>
            <select name='materia' required>
                ${materiasDis}
            <select>
            <br><br>
            <input type='submit' class='btnAccion' value='Agregar tienda'>
        </form>
        <br>
        <button class='btRegresar'><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(`<div class='container6'>${formulario}</div><div class='container5'>${tabla}</div>`, "Tabla de Alumnos")
    }

    generarFormularioDistribuidoras(grupos){
        let filas = "";
        
        for(let i = 0; i< grupos.length; i++){
            filas += `<tr>
                <td>${grupos[i]}</td>
            <tr>`;
        }

        let tabla = ` <h3>Distribuidoras existentes<h3><table>
            <tr>
                <td>Distribuidora</td>
            </tr>
            ${filas}
        </table>`;

        let formulario = `<p align='center'>Registra las distribuidoras que abastecen a las tiendas:</p><form align='center' action="/ingresarGrupo" method="POST">
            <input type="text" minlength='3' placeholder='Nombre de la distribuidora' name="grupo" required>
            <br>
            <input type="submit" class='btnAccion' value="Agregar Distribuidora">
        </form>
        <br>
        <button class='btRegresar'><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(`<div class='container4'>${formulario}</div>`+"<br><br>"+`<div class='container3'>${tabla}</div>`);
    }

    generarFormularioTipos(materias){
        let filas = "";
        
        for(let i = 0; i< materias.length; i++){
            filas += `<tr>
                <td>${materias[i]}</td>
            <tr>`;
        }

        let tabla = `<table>
            <h3>Tipos de tienda</h3>
            <tr>
                <td>Clasificaciones de tienda</td>
            </tr>
            ${filas}
        </table>`;

        let formulario = `<form align='center' action="/ingresarTipo" method="POST">
            <p>Registra los tipos de tiendas que venden los productos:</p>
            <input type="text" minlength='3' placeholder='Ej.(abarrotes, ropa)' name="materia" required>
            <br>
            <input class='btnAccion' type="submit" value="Agregar tipo de tienda">
        </form>
        <br>
        <button class='btRegresar'><a href='index.html'>Regresar</a></button>`;

        return this.generarEstructuraHtml(`<div class='container4'>${formulario}</div>`+"<br><br>"+`<div class='container3'>${tabla}</div>`);
    }

    mostrarTienda(profesor, materias, grupos){
        let gruposDis = "", materiasDis = "";

        for(let i = 0; i < grupos.length; i ++){
            gruposDis += `<option value='${grupos[i]}' ${(grupos[i] === profesor.getDis)?"selected":""}>${grupos[i]}</option>`;
        }

        for(let i = 0; i < materias.length; i ++){
            materiasDis += `<option value='${materias[i]}' ${(materias[i] === profesor.getTipo)?"selected":""}>${materias[i]}</option>`;
        }

        let profe = `<div class='container7'><form action='/modificarT' method='POST'>
        <p>Modifica el registro de la tienda y guarda los cambios</p>
        <input type='hidden' name='id' value='${profesor.getIdentificador}'>
        <p>Nombre de la tienda:</p>
        <input type='text' minlength='3' name='nombre' value='${profesor.getNombre}'>
        <input type='hidden' min='0' name='edad' value='${profesor.getEdad}'>
        <br>
        <p>Selecciona la distribuidora:</p>
        <select name='grupo'>
            ${gruposDis}
        </select>
        <br>
        <p>Selecciona el tipo de tienda:</p>
        <select name='materia'>
            ${materiasDis}
        </select>
        <br>
        <input type='submit' class='btModificar' value='Modificar'>
        </form>
        <br>
        <button class='btRegresar'><a href='/obtenerTiendas'>Regresar</a></button></div>`;

        return this.generarEstructuraHtml(profe);
    }

    mostrarProducto(alumno, grupos){
        let gruposDis = "";

        for(let i = 0; i < grupos.length; i ++){
            gruposDis += `<option value='${grupos[i]}' ${(grupos[i] === alumno.getDis)?"selected":""}>${grupos[i]}</option>`;
        }

        let alum = `<div class='container7'><form action='/modificarP' method='POST'>
        <p>Modifica los datos del registro del producto y guarda los cambios</p>  
        <input type='hidden' name='boleta' value='${alumno.getId}'>
        <p>Nombre del producto:</p>
        <input type='text' minlength='3' name='nombre' value='${alumno.getNombre}'>
        <br>
        <p>Piezas:</p>
        <input type='number' min='0' name='edad' value='${alumno.getEdad}'>
        <br>
        <p>Distribuidora:</p>
        <select name='grupo'>
            ${gruposDis}
        </select>
        <br>
        <input type='submit' class='btModificar' value='Modificar'>
        </form>
        <br>
        <button class="btregresar"><a href='/obtenerProductos'>Regresar</a></button></div>`;

        return this.generarEstructuraHtml(alum);
    }

    generarTablaRelaciones(horarios){
        let horario = "", anterior = "", fichas = "";

        for(let i = 0; i < horarios.length; i++){
            fichas += `<tr>
                <td>${horarios[i].nProfesor}</td>
                <td>${horarios[i].materia}</td>
                <td>${horarios[i].grupo}</td>
            </tr>`;
        }

        horario += `<h3>Registro de tiendas con su distribuidora:</h3><table>
            <tr>
                <td>Tienda</td>
                <td>Tipo de tienda</td>
                <td>Distribuidora</td>
            </tr>
            ${fichas}
        </table>
        <br>
        <br>
        <button class='btRegresar'><a href='index.html'>Regresar</a></button>`;
        
        return this.generarEstructuraHtml(`<div class='container7'>${horario}</div>`);
    }
}

module.exports = Generar;