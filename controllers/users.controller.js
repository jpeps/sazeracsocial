var mongoose = require('mongoose')
var passport = require('passport')

// MODELS
var User = require('../models/user.model')

module.exports = {

    // ---------- REGISTER ---------- //

    registerNewUser: function(req, res) {
        var errors = null

        req.checkBody('username', 'Username field cannot be empty.').notEmpty()
        req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15)
        req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i')
        req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail()
        req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100)
        req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100)
        req.checkBody("password", 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        req.checkBody('password_confirm', 'Password must be between 8-100 characters long.').len(8, 100)
        req.checkBody('password_confirm', 'Passwords do not match, please try again.').equals(req.body.password)

        req.getValidationResult().then((results) => {
            if (!results.isEmpty()) {
                console.log(results.array())
                res.render('users/register', { errors: results.array() })
            } else {
                var newUser = { username: req.body.username, email: req.body.email }
                User.register(newUser, req.body.password, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.redirect('/')
                    } else {
                        passport.authenticate('local', {
                            successRedirect: '/posts',
                            failureRedirect: '/'
                        })(req, res, () => {})
                    }
                })
            }
        })
    },

    // ---------- LOGIN/LOGOUT ---------- //
    userLoginAuth: function(req, res) {
        passport.authenticate('local', {
          successRedirect: '/posts',
          failureRedirect: '/'
        }) (req, res, function() {})
    },

    // ---------- RENDERS ---------- //
    userRegister: function (req, res) {
        res.render('users/register')
    },

    userRegisterModal: function(req, res) {
        res.render('users/register-modal')
    },

    userLogin: function(req, res) {
        res.render('users/login')
    },

    userLoginModal: function(req, res) {
        res.render('users/login-modal')
    }
}
