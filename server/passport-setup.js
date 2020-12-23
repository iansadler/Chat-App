const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const port = process.env.PORT || 5000
const clientInfo = require('./clientInfo')
const pool = require('./database/db')

passport.serializeUser(function(user, done) {
  done(null, {id: user.id, displayName: user.displayName })
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
  async function(accessToken, refreshToken, profile, done) {
    const findUser = await pool.query(`SELECT * FROM users WHERE google_id='${profile.id}'`)
    if (findUser.rowCount === 0) {
      console.log('The user was not found')
      // Create new user in the db
      let string = `INSERT INTO users (google_id, username) VALUES ('${profile.id}', '${profile.displayName}') RETURNING *`
      console.log(string)
      const createUser = await pool.query(string)
    }
    return done(null, profile)
  }
))