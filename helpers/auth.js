module.exports ={
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }else{
      req.flash('error_msg', 'No estás autorizado');
      res.redirect('/users/login')
    }
  }
}