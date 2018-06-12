const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear el esquema
const AlmacenSchema = new Schema({
  nombre:{
    type: String,
    required: true,
  },
  codigo:{
    type: String,
    required: true
  },
  proyecto:{
    type: String,
    required: true
  },
  date:{
    type:Date,
    default: Date.now
  }
});

mongoose.model('proyectos', ProyectoSchema);