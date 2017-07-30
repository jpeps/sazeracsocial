var mongoose = require('mongoose')
var passport = require('passport')

// MODELS
var User = require('../models/user.model')

module.exports = {

    // ---------- REGISTER ---------- //

    userRegister: function (req, res) {
        res.render('users/register')
    },

    userRegisterModal: function(req, res) {
        res.render('users/register-modal')
    },

    registerNewUser: function(req, res) {
        // var newUser = new User({username: req.body.username})
        // User.register(newUser, req.body.password, function(err, user) {
        //     if (err) {
        //       req.flash('error', err.message)
        //       return res.redirect('/register')
        //     } else {
        //       passport.authenticate('local')(req, res, function() {
        //         req.flash('success', 'Welcome ' + user.username)
        //         res.redirect('/campgrounds')
        //       })
        //     }
        // })
        console.log('Good jorb, new guy!')
        res.redirect('/posts')
    },

    // ---------- LOGIN ---------- //

    userLogin: function(req, res) {
        res.render('users/login')
    },

    userLoginModal: function(req, res) {
        res.render('users/login-modal')
    },

    userLoginAuth: passport.authenticate('local', {
        successRedirect: '/posts',
        failureRedirect: '/'
    }), function(req, res) { }

}
