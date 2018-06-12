const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Crear el esquema
const RackSchema = new Schema({
  codigo:{
    type: String,
    required: true,
  },
  zona:{
    type: String,
    required: true,
    index: true
  },
  date:{
    type:Date,
    default: Date.now
  }
});

mongoose.model('racks', RackSchema);