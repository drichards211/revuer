'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const { PORT, DATABASE_URL } = require('./config')
const { OMDB_API_KEY } = require('./config')
const { router: usersRouter } = require('./users')
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')

app.use(express.static('public'))
app.use(morgan('common'))
mongoose.Promise = global.Promise

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  if (req.method === 'OPTIONS') {
    return res.send(204)
  }
  next()
})

passport.use(localStrategy)
passport.use(jwtStrategy)

app.use('/api/users/', usersRouter)
app.use('/api/auth/', authRouter)
// eventually add endpoint: app.use('/api/movies/', moviesRouter)

const jwtAuth = passport.authenticate('jwt', { session: false })

// Test endpoint for protected access: 
app.get('/api/protected', jwtAuth, (req, res) => {
  console.log(req.user) // logs to the server console
  return res.json({
    data: 'potato'
  })
})

// Endpoint to retrieve the OMDB API Key:
app.get('/api/omdbapikey', jwtAuth, (req, res) => {
  return res.json({
    data: `${OMDB_API_KEY}`
  })
})

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' })
})

let server

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err)
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`)
        resolve()
      })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}

/* function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`)
          resolve()
        })
        .on('error', err => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}
 */
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server')
      server.close(err => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err))
}

module.exports = { app, runServer, closeServer }

// OLD LOCAL CODE
/* if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`)
  })
}

module.exports = app */