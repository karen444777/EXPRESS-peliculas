const mongoose = require('mongoose');

// Define el esquema para las películas
const peliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  director: { type: String, required: true },
  actores: { type: [String], required: true },
  año: { type: Number, required: true }
});

// Crea el modelo de Película
const Pelicula = mongoose.model('Pelicula', peliculaSchema);

// Exporta el modelo para su uso en otros archivos
module.exports = Pelicula;
