var testMiddleware = {
  test: function(req, res, next) {
    console.log('middleware, BAM!')
    return next()
  },

  testTwo: function(req, res, next) {
    console.log('middleware, TWO!')
    return next()
  }
}

module.exports = testMiddleware
