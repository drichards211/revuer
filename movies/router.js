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
 
// Edit a preexisting movie:
router.put('/:id', jwtAuth, jsonParser, (req, res) => {
  console.log(req.user) // logs to the server console
  console.log(req.body)
  const requiredFields = ['_id', 'rating', 'ownCopy', 'format', 'viewingNotes', 'user_id']
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  console.log(req.body._id)
  if (!(req.params.id && req.body._id && req.params.id === req.body._id)) {
    const message =
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body._id}) must match`;
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['rating', 'ownCopy', 'format', 'viewingNotes']
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });
  console.log(toUpdate)
  
  Movie  
  .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(updatedPost => {
      res.status(204).end()
    })
    .catch(err => res.status(500).json({ message: "Internal server error" }));
});

// Delete a movie by id:
router.delete('/:id', jwtAuth, jsonParser, (req, res) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(deletedMovie => {
      console.log(`Deleted movie: \`${req.params.id}\``);
      res.status(204).end();
    });
})

module.exports = {router}
