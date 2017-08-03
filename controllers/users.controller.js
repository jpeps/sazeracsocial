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
        var newUser = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        //   password_confirm: req.body.password_confirm
        }

        User.register(newUser, newUser.password, (err, user) => {
            if (err) {
                console.log('You dun fucked up')
                console.log(err)
                res.redirect('/')
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.redirect('/posts')
                })
            }
        })
    },

    // ---------- LOGIN/LOGOUT ---------- //

    userLogin: function(req, res) {
        res.render('users/login')
    },

    userLoginModal: function(req, res) {
        res.render('users/login-modal')
    },

    userLoginAuth: passport.authenticate('local', {
        successRedirect: '/posts',
        failureRedirect: '/'
    }),
}
