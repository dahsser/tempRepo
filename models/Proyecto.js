const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear el esquema
const ProyectoSchema = new Schema({
  nombre:{
    type: String,
    required: true,
  },
  descripcion:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  date:{
    type:Date,
    default: Date.now
  }
});

mongoose.model('proyectos', ProyectoSchema);