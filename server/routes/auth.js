const express = require('express')
const router = express.Router()
const passport = require('passport')

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
      res.redirect('/auth/good')
    }
  )

  .get('/failed', (req, res) => {
    res.send('You failed to log in.')
  })

  .get('/good', (req, res) => {
    res.send(`Welcome mr ${req.user.displayName}`)
  })

  .get('/logout', (req, res) => {
    req.session = null
    req.logout()
    req.redirect('/')
  })

module.exports = router