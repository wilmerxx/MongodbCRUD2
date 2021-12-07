const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    cliente: {
        type: String,
        require: true 
    },
    animal: {
        type: String,
        require: true 
    },
    raza: {
        type: String,
        require: true 
    },
    sexo: {
        type: String,
        require: true 
    },
    nacimiento: {
        type: String,
        require: true 
    },
    direccion: {
        type: String,
        require: true 
    },
    telefono: {
        type: String,
        require: true 
    }

});

module.exports = mongoose.model('Producto', ProductoSchema);