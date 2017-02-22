// ----- EXAMPLES ----- //

// Index
router.get('/', function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds})
    }
  })
})

// New post
router.post('/', globalMiddleware.isLoggedIn, function(req, res) {
  var name          = req.body.name
  var image         = req.body.image
  var description   = req.body.description
  var author        = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = { name: name, img: image, desc: description, author: author }
  Campground.create(newCampground, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      campground.author = author
      res.redirect("/campgrounds")
    }
  })
})

// New Form
router.get('/new', globalMiddleware.isLoggedIn, function(req,res) {
  res.render('campgrounds/new')
})

// Show
router.get('/:id',function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, found) {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds/show', {campground: found})
    }
  })
})

// Edit
router.get('/:id/edit', campgroundsMiddleware.checkCampgroundOwnership, function(req,res) {
  Campground.findById(req.params.id, function(err, campground) {
    res.render('campgrounds/edit', {campground: campground})
  })
})

// Update
router.put('/:id', campgroundsMiddleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  })
})

// Destroy
router.delete('/:id', campgroundsMiddleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})
