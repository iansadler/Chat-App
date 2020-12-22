const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const port = process.env.PORT || 5000
const clientInfo = require('./clientInfo')
console.log(clientInfo)
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(user, done) {
  // User.findById(id, function(err, user) {
  done(null, user)
  // })
})

passport.use(new GoogleStrategy({
    clientID:     clientInfo.GOOGLE_CLIENT_ID,
    clientSecret: clientInfo.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${port}/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    // use the profile info, mainly profile id to check if the user is registered in your DB
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    // return done(null, user)
    return done(null, profile)
    // })
  }
))