const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

//Cargar el modelo Proyecto
require('../models/Proyecto');
const Proyecto = mongoose.model('proyectos');

// Proyecto index page

router.get('/', ensureAuthenticated, (req, res)=>{
  Proyecto.find({user: req.user.id})
    .sort({date:'desc'})
    .then( proyectos =>{
      res.render('proyectos/index', {
        proyectos:proyectos
      });
    })
})

// Ruta agregar proyectos
router.get('/agregar', ensureAuthenticated, (req, res)=>{
  res.render('proyectos/agregar');
});

// Edit proyecto Form
router.get('/editar/:id', ensureAuthenticated, (req, res)=>{
  Proyecto.findOne({
    _id: req.params.id
  })
  .then(proyecto =>{
    if(proyecto.user != req.user.id){
      req.flash('error_msg', 'No autorizado');
      res.redirect('/proyectos');
    }else{
      res.render('proyectos/editar', {
        proyecto:proyecto
      });
    }
  })
  
});

// Process Form
router.post('/', ensureAuthenticated, (req, res)=>{
  let errors = [];
  console.log(req.body);
  if(!req.body.nombre){
    errors.push({text: 'Por favor, agregue el nombre'})
  }
  if(!req.body.descripcion){
    errors.push({text: 'Por favor, agregue una descripción'})
  }
  if(errors.length > 0){
    res.render('proyectos/agregar', {
        errors: errors,
        nombre : req.body.nombre,
        descripcion: req.body.descripcion
    });
  }else{
    const newProyecto = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      user: req.user.id
    }
    new Proyecto(newProyecto)
    .save()
    .then(proyecto =>{
      req.flash('success_msg', 'Proyecto creado');
      res.redirect('/proyectos')
    })
    .catch((err)=>{
      console.log("Error en post proyecto:",err);
    })
  }
});

// Edit Form process

router.put('/:id', ensureAuthenticated, (req, res)=>{
  Proyecto.findOne({
    _id:req.params.id
  })
  .then(proyecto =>{
    // nuevos valores
    proyecto.nombre = req.body.nombre,
    proyecto.descripcion = req.body.descripcion
    
    proyecto.save()
      .then(proyecto =>{
        req.flash('success_msg', 'Existencia actualizada');
        res.redirect('/proyectos');
      })
  });
});

// Delete proyecto

router.delete('/:id', ensureAuthenticated, (req, res)=>{
  Proyecto.remove({_id : req.params.id})
    .then(() => {
      req.flash('success_msg', 'Existencia borrada');
      res.redirect('/proyectos')
    });
});

module.exports = router;