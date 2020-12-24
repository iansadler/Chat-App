// const Joi = require('joi')
const cors = require('cors')
const express = require('express')
const { auth, isLoggedIn } = require('./routes/auth')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const app = express()
const conversations = require('./testConversations.json')
const pool = require('./database/db')

require('./passport-setup')
app.use(cookieSession({
  name: 'chat-app-session',
  keys: ['key1', 'key2']
}))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

app.use(express.json())
app.use('/auth', auth)

app.get('/api/users', isLoggedIn, async (req, res) => {
  const allUsers = await pool.query('SELECT user_id, username FROM users')
  res.json(allUsers.rows)
})

// User can query conversations regardless of whether they are involved at the moment.
// app.get('/api/conversations/:id1/:id2', isLoggedIn, async (req, res) => {

// })

app.get('/', (req, res) => {
  res.send('Hello World.. you are not logged in')
})

// app.get('/api/conversations/:id', (req, res) => {
//   // For now just send back testConversations.json
//   res.send(conversations)
// })

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))