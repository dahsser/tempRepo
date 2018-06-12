const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear el esquema
const ZonaSchema = new Schema({
  codigo:{
    type: String,
    required: true,
  },
  almacen:{
    type: String,
    required: true,
    index: true
  },
  date:{
    type:Date,
    default: Date.now
  }
});

mongoose.model('zonas', ZonaSchema);