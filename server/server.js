// const Joi = require('joi')
const cors = require('cors')
const express = require('express')
const auth = require('./routes/auth')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const app = express()
const conversations = require('./testConversations.json')

require('./passport-setup')
app.use(cookieSession({
  name: 'chat-app-session',
  keys: ['key1', 'key2']
}))

app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}))

app.use(express.json())
app.use('/auth', auth)

app.get('/', (req, res) => {
  res.send('Hello World.. you are not logged in')
})

app.get('/api/conversations/:id', (req, res) => {
  // For now just send back testConversations.json
  res.send(conversations)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))