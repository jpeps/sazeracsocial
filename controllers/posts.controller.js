var mongoose = require('mongoose')

// MODELS
var Post = require('../models/post.model')

module.exports = {

  postsGetAll: function(req, res) {
    Post.find({}, function(err, allPosts) {
      if (err) {
        console.log(err)
      } else {
        res.render('posts/index', { posts: allPosts })
      }
    })

    console.log('post get all')
  },

  postsRenderNew: function(req, res) {
    res.render('posts/new')
  },

  postsAddOne: function(req, res) {
    console.log('poo')
    var newPost = {
      post_title: req.body.post_title,
      main_image: req.body.main_image,
      post_body: req.body.post_body,
    }

    console.log('-------------------------------------------------------------')
    console.log(newPost)
    console.log('-------------------------------------------------------------')

    Post.create(newPost, function(err, post) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/posts')
      }
    })

    console.log('post add one')
  },

  postsGetById: function(req, res) {
    Post.findById(req.params.postId, function(err, found) {
      if (err) {
        console.log(err)
      } else {
        res.render('posts/show', { post: found })
      }
    })

    console.log('post get by id')
  },

  postsUpdateById: function(req, res) {
    res.send('post update by id')
    console.log('post update by id')
  },

  postsDeleteById: function(req, res) {
    res.send('post delete by id')
    console.log('post delete by id')
  }

}

// ----- EXAMPLES ----- //

// Index
// router.get('/', function(req, res) {
//   Campground.find({}, function(err, allCampgrounds) {
//     if (err) {
//       console.log(err)
//     } else {
//       res.render('campgrounds/index', {campgrounds: allCampgrounds})
//     }
//   })
// })

// // New post
// router.post('/', globalMiddleware.isLoggedIn, function(req, res) {
//   var name          = req.body.name
//   var image         = req.body.image
//   var description   = req.body.description
//   var author        = {
//     id: req.user._id,
//     username: req.user.username
//   }
//   var newCampground = { name: name, img: image, desc: description, author: author }
//   Campground.create(newCampground, function(err, campground) {
//     if (err) {
//       console.log(err)
//     } else {
//       campground.author = author
//       res.redirect("/campgrounds")
//     }
//   })
// })

// // New Form
// router.get('/new', globalMiddleware.isLoggedIn, function(req,res) {
//   res.render('campgrounds/new')
// })

// // Show
// router.get('/:id',function(req, res) {
//   Campground.findById(req.params.id).populate('comments').exec(function(err, found) {
//     if (err) {
//       console.log(err)
//     } else {
//       res.render('campgrounds/show', {campground: found})
//     }
//   })
// })

// // Edit
// router.get('/:id/edit', campgroundsMiddleware.checkCampgroundOwnership, function(req,res) {
//   Campground.findById(req.params.id, function(err, campground) {
//     res.render('campgrounds/edit', {campground: campground})
//   })
// })

// // Update
// router.put('/:id', campgroundsMiddleware.checkCampgroundOwnership, function(req, res) {
//   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//     if (err) {
//       console.log(err)
//       res.redirect('/campgrounds')
//     } else {
//       res.redirect('/campgrounds/' + req.params.id);
//     }
//   })
// })

// // Destroy
// router.delete('/:id', campgroundsMiddleware.checkCampgroundOwnership, function(req, res) {
//   Campground.findByIdAndRemove(req.params.id, function(err){
//     if (err) {
//       console.log(err)
//       res.redirect('/campgrounds')
//     } else {
//       res.redirect('/campgrounds')
//     }
//   })
// })
