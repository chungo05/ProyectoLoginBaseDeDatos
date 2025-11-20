// --- Importar las librerias

// El quien maneja las peticiones web
const express = require('express');
//  El que permite trabajar las rutas de archivo
const path = require('path');
// El traductor de SQL a JS
const sqlite3 = require('sqlite3');
// La licuadora de constraseñas
const bcrypt = require('bcryptjs');
const { hash } = require('crypto');

// -- CREAR LA APP

// Creamos la app de express que es nuestro servidor web
const app = express();
// definimos el port donde estará nuestro servidor
const PORT = 3000; // SI NO FUNCIONA EL PORT ES PORQUE DEBE DE SER 5500
// Definimos la lentitud del hasheo
const saltRounds = 10;
// Ruta segura a la base de datos
const dbPath = path.join(__dirname, 'data', 'LaBase.sqlite')


// -- CONECTAR A LA BASE DE DATOS --
// Creamos una nueva conexión a nuestro acrhivo de base de datos
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err.message);   
    } else {
        console.log('Conectado exitosamente a la base de datos');
    }
});


// CONFIGURAR LOS MIDDLEWARES O SEA LOS AYUDANTES DE LA APP


// A) Middleware de URLencoded
// Le enseña a express  como leer datos que vienen de un formulario (FORM)
// sin esto, eq.body llegaría undefined.
app.use(express.urlencoded({ extended : true}));

// B) Middleware de archivos estáticos
// Le dice a express donde están los archivos estáticos (css, js, images)
// path.join(__dirname, 'public') crea una ruta segura a tu carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// -----------
// AQUI IRAN LAS RUTAS/LOGICA DE LA APP "LAS RECETAS"
// Aqui es donde pondremos nuestro app.post('/registrar y asi)
app.post('/registrar', (req, res) => {
    console.log('Datos recibidos en /registrar:');
    // recibimos los datos del formulario
    // usamos req.body, const y los names que definimos en registro
    const { usuario, pass1, pass2 } = req.body;

    // Verificamos el usuario existente
    // usamos const sqlSelect, la preparamos
    const sqlSelect = "SELECT Usuario FROM Usuarios WHERE Usuario = ?";

    // db.get y recibimos el usuario, err y fila en parentesis 
    db.get(sqlSelect, [usuario], (err, fila) => {
    // 1 if si sale err, res.send
        if(err){
            return res.send("Error al guardar el usuario en la base de datos" + err.message);
        }
    // 2  si la fila existe, res.send usuario ya existe, decir que mande otro
        if (fila){
            return res.send("Error, el nombre de usuario ya existe");
        }
        // ya paso la verificación de usuario
        // 3 la verificación de contraseña de manera local, si !==  mandar mensaje de poner otra
        if(pass1 !== pass2){
            return res.send("Tu contraseña no coincide, vuelve a intentarlo");
        }
        // Ya el usuario y la contraseña se verificaron
        /**
         * Hasheamos la contraseña con bcrypt.hash(datos de entrada, la pass y el salt round(err y hash)) => {
         * dentro de {} esta el if error
         */
        bcrypt.hash(pass1, saltRounds, (err, hash) => {
            if(err){
                return res.send ("Hubo un error al encriptar tu contraseña" + err.message)
            }
        // YA ESTA HASHEADA LA CONTRASEÑA, AHORA TOCA INSERTARLA
        // HACEMOS EL sqlInsert = "Comando"
            const sqlInsert = "INSERT INTO Usuarios (Usuario, ClaveHash) VALUES (?, ?)";
            const datos = [usuario, hash];
        // db.run ([el Sqlinsert y el hash] (err)) => {}
            db.run(sqlInsert, datos, (err) => {
                // if de error 
                if(err){
                  return res.send("Error al hacer tu registro, intente de nuevo" + err.message);
                }
             // FUNCIONO, MANDA DENTRO DE ESTE RUN EL MENSAJE DE FELICIDADES CON RES.SEND
                return res.send("FELICIDADES, TU REGISTRO SE HA COMPLETADO")
            });
        });
    });
});

// nueva receta: procesar el login
app.post('/login', (req, res) => {
    console.log("intento de login recibido...")
    //1.- Recibimos los datos del formulario
    // usamos el name que le pusimos en html en {} y req.body
    const { }

    // hacemos la consulta de select usuario, clave from y where

    // hacemos el db.get (consulta, [usuario] (err, fila))
        // Error

        // Comparar contraseña
        // Usamos bcrypt.compare para ver si 'password' coincide con 'fila.ClaveHash'
        // Es pareceida al hash, reciba password fila.claveHash (err, coinciden)
            // error
            // coinciden bienvenido con fila.Usuario
                //else fallo la contraseña

});


// --- NUEVA FUNCION: OBTENER LA LISTA DE USUARIOS ---
// Esta ruta sera para llenar la lista desplegable del login
// El navegador lo llamara autojmaticamente al cargar la pagina
app.get('/api/usuarios', (req, res) => {
    console.log("Alguien pidió la lista de usuarios (/api/usuarios)");

    // 1.- La consulta: SOLO pedimos el nombre, nada de contraseñas
    const sql = "SELECT Usuario FROM Usuarios";

    // 2.- EJecutar la consulta con db.all()
    // db all recupera todas las filas que coincidan

    // db all (el sql, [] (error y filas))
        // if err di que hubo un error al consultar los usuarios +  err.message
    
    db.all(sql, [], (err, filas) => {
        if (err){
            return res.send ("Hubo un error al consultar los usuarios a la base de datos " + err.message);
        }
        // 3.- Enviar la respuesta
    // con res.json(lo que da el db.all)
        res.json(filas);
    });
});


//  ABRIR EL RESTAURANTE (INICIAR EL SERVIDOR)
//  Le decimos a la 'app' que empeice a ' escuchar' peticiones en el puerto que decidimos antes
app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});