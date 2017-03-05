var authMiddleware = {
  isLoggedIn: function(req, res, next) {
    // if (req.isAuthenticated()) {
    //   return next()
    // } else {
    //   req.flash('error', 'You need to be logged in to do the thing!')
    //   res.redirect('/login')
    // }
    console.log('Auth check')
    return next()
  }
}

module.exports = authMiddleware
