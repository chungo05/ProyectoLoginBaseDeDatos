// --- Importar las librerias

// El quien maneja las peticiones web
const express = require('express');
//  El que permite trabajar las rutas de archivo
const path = require('path');
// El traductor de SQL a JS
const sqlite3 = require('sqlite3');
// La licuadora de constraseñas
const bcrypt = require('bycrypt');

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
const db = new sqlite33.Database(dbPath, (err) => {
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
            return res.send("Error al guardar el usuario en la base de datos");
        }
    });

    

    // 2  si la fila existe, res.send usuario ya existe, decir que mande otro


    // 3 la verificación de contraseña de manera local

});



//  ABRIR EL RESTAURANTE (INICIAR EL SERVIDOR)
//  Le decimos a la 'app' que empeice a ' escuchar' peticiones en el puerto que decidimos antes
app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
})