var mongoose = require('mongoose')
var passport = require('passport')

// MODELS
var User = require('../models/user.model')

module.exports = {

    // ---------- LOGIN ---------- //

    userLoginModal: function(req, res) {
        res.render('users/login')
    },

    userLoginAuth: passport.authenticate('local', {
        successRedirect: '/posts',
        failureRedirect: '/about'
    }), function(req, res) { }

    // ---------- LOGIN ---------- //

}
