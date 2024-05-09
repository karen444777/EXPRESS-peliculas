const express = require('express');
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Peliculas');

// Definir el esquema de la película
const movieSchema = new mongoose.Schema({
    nombre: String,
    año: Number,
    director: String,
    actores: [String],
    imagen: String
});

// Definir el modelo de película
const Movie = mongoose.model('Movie', movieSchema);

const app = express();

// Aquí creamos la instancia de la aplicación Express, luego configuramos el motor de vistas
app.set('view engine', 'ejs');

// Ruta para obtener todas las películas y renderizar la vista
app.get('/peliculas', async (req, res) => {
    try {
        const peliculas = await Movie.find();
        res.render('peliculas.ejs', { peliculas: peliculas });
    } catch (error) {
        console.error('Error al obtener películas:', error);
        res.status(500).json({ error: 'Error al obtener películas' });
    }
});

// Ruta para manejar el inicio de sesión como invitado
app.post('/login-guest', (req, res) => {
    // Lógica de inicio de sesión como invitado
    res.redirect('/peliculas'); // Redireccionar al catálogo de películas
});

// Ruta para manejar el inicio de sesión como administrador
app.post('/login-admin', (req, res) => {
    const adminUsername = req.body.adminUsername;
    const adminPassword = req.body.adminPassword;
    
    // Verificar las credenciales de administrador
    if (adminUsername === 'admin' && adminPassword === 'admin') {
        res.redirect('/peliculas'); // Redireccionar al catálogo de películas
    } else {
        res.send('Credenciales de administrador incorrectas');
    }
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function () {
    console.log('Conexión exitosa a MongoDB');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

