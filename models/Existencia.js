const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear el esquema
const ExistenciaSchema = new Schema({
  codigo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    require: true
  },
  rack: {
    type: String,
    required: true,
    index: true
  },
  stock: {
    type: Number,
    required: false,
    min: 0,
  },
  ubicacion: {
    codigo: {
      type: String
    },
    fila: {
      type: String,
    },
    columna: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('existencias', ExistenciaSchema);