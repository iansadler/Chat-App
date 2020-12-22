// const Joi = require('joi')
const cors = require('cors')
const express = require('express')
const auth = require('./routes/auth')
const cookieSession = require('cookie-session')
const passport = require('passport')
const app = express()
const conversations = require('./testConversations.json')

require('./passport-setup')
app.use(cookieSession({
  name: 'chat-app-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
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