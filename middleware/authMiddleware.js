var authMiddleware = {
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  },
  
  authEditor: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log(req.user)
      return next()
    }
    res.redirect('/')
  }
}

module.exports = authMiddleware
