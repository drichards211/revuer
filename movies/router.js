'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const {User} = require('../users/models')
const {Movie} = require('./models')
const router = express.Router()
const jsonParser = bodyParser.json()
const passport = require('passport');
const { router: authRouter, localStrategy, jwtStrategy } = require('../auth/strategies');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false })

// Post to create a new movie:
router.post('/', jwtAuth, jsonParser, (req, res) => {
  console.log(req.user) // logs to the server console
  const requiredFields = ['title', 'imdbId', 'rating', 'ownCopy']
  const missingField = requiredFields.find(field => !(field in req.body))
  
  // Make certain all required fields are included:
  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    })
  }
  // Make certain movie doesn't already exist:
  Movie.findOne({userName: req.user.username, imdbId: req.body.imdbId})
    .then(foundMovie => {
      if (foundMovie) {
        console.log(`FOUND MOVIE = ${foundMovie}`)
        const errMessage = 'Movie already exists'
        console.error(errMessage)
        return res.status(400).send(errMessage);
      
      } else {
        // Locate User's _.id value:
        User.findOne({username: req.user.username})
          .then(foundUser => {
            console.log(`FOUND USER = ${foundUser}`)
            // Create Movie document:
            Movie.create({
              title: req.body.title,
              imdbId: req.body.imdbId,
              rating: req.body.rating,
              ownCopy: req.body.ownCopy,
              format: req.body.format,
              viewingNotes: req.body.viewingNotes,
              user_id: foundUser._id,
              created: req.body.created
            })
            .then(createdMovie => {
              res.status(201).json(createdMovie.serialize())
              
              // Snazzy method to populate full user-info from Movie document:
              /* Movie.findOne({_id: createdMovie._id})
              .populate({path: 'user_id'}) // mongoose method
              .then(foundMovie => {
                res.status(201).json(foundMovie())
              }) */

            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ error: 'Something went wrong' });
            })
          })
      }
    })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  })
})

// GET all movies for a specific user:
router.get('/', jwtAuth, jsonParser, (req, res) => {
  console.log(req.user) // logs to the server console
  User.findOne({username: req.user.username})
    .then(foundUser => {
      console.log(`FOUND USER = ${foundUser}`)
      Movie.find({user_id: foundUser._id})
        .then(foundMovies => {
          if (foundMovies) {
            console.log(`FOUND MOVIES = ${foundMovies}`)
            res.json(foundMovies)
          } else {
            res.status(500).json({ error: 'There are no movies' });
          }
          
        })
      })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  })
})
 
module.exports = {router}
