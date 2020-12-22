const express = require('express')
const router = express.Router()
const passport = require('passport')
const CLIENT_HOMEPAGE = 'http://localhost:3000'

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(401)
  }
}

router
  .get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  .get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failed' }),
    function(req, res) {
      res.redirect(CLIENT_HOMEPAGE)
    }
  )

  .get("/success", isLoggedIn, (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
      })
    }
  })

  .get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect(CLIENT_HOMEPAGE)
  })

module.exports = router