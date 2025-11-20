# Proyecto Login con Base de Datos

Sistema de autenticación de usuarios con registro y login utilizando Node.js, Express y SQLite.

## 📋 Descripción

Este proyecto implementa un sistema completo de autenticación que incluye:
- Registro de nuevos usuarios
- Almacenamiento seguro de contraseñas con bcrypt
- Base de datos SQLite
- Interfaz web con HTML y CSS

## 🚀 Características

- ✅ Registro de usuarios con validación
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Verificación de usuarios duplicados
- ✅ API para obtener lista de usuarios
- ✅ Base de datos SQLite persistente
- ✅ Interfaz web responsive

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** SQLite3
- **Seguridad:** bcryptjs
- **Frontend:** HTML, CSS

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU_USUARIO/ProyectoLoginBaseDeDatos.git
cd ProyectoLoginBaseDeDatos
```
2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor:
```bash
node servidor.js
```

4. Abre en tu navegador:
```bash
http://localhost:3000
```

## Estructura del proyecto actual
ProyectoLoginBaseDeDatos/
├── data/
│   └── LaBase.sqlite       # Base de datos SQLite
├── public/
│   ├── login.html          # Página de login
│   ├── registro.html       # Página de registro
│   └── styles.css          # Estilos CSS
├── images/                 # Imágenes del proyecto
├── servidor.js             # Servidor Express
└── package.json           # Dependencias


🔗 Endpoints API

POST /registrar
Registra un nuevo usuario en el sistema.

Body:
•  usuario: Nombre de usuario
•  pass1: Contraseña
•  pass2: Confirmación de contraseña

GET /api/usuarios
Obtiene la lista de todos los usuarios registrados.

📝 Historial de Desarrollo

•  Commit 1: Configuración inicial del proyecto
•  Commit 2: Importación de paquetes, creación de puerto y app, middlewares, iniciar servidor
•  Commit 3: Implementación de db.get para verificación de usuarios
•  Commit 4: Corrección de registro.html e inicio de login.html

👤 Autor

Chung05
