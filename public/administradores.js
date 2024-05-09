const mongoose = require('mongoose');

// Define el esquema para los administradores
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Crea el modelo de Administrador
const Administrador = mongoose.model('Administrador', adminSchema);

// Exporta el modelo para su uso en otros archivos
module.exports = Administrador;
