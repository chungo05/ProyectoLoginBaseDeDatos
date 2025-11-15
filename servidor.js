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




//  ABRIR EL RESTAURANTE (INICIAR EL SERVIDOR)
//  Le decimos a la 'app' que empeice a ' escuchar' peticiones en el puerto que decidimos antes
app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
})