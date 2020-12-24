const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const port = process.env.PORT || 5000
const clientInfo = require('./clientInfo')
const pool = require('./database/db')

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, {id: user.id, displayName: user.displayName, user_id:user.user_id })
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
      const createUser = await pool.query(string)
      profile.user_id = createUser.rows[0].user_id
    } else {
      profile.user_id = findUser.rows[0].user_id
    }
    return done(null, profile)
  }
))