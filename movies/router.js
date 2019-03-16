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
  const requiredFields = ['title', 'imdbId', 'viewed', 'rating', 'ownCopy']
  const missingField = requiredFields.find(field => !(field in req.body))

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    })
  }
  User.findOne({username: req.user.username})
    .then(foundUser => {
      console.log(`FOUND USER = ${foundUser}`)
      console.log(foundUser._id)
    
      Movie.create({
        title: req.body.title,
        imdbId: req.body.imdbId,
        viewed: req.body.viewed,
        rating: req.body.rating,
        ownCopy: req.body.ownCopy,
        format: req.body.format,
        viewingNotes: req.body.viewingNotes,
        user_id: foundUser._id,
        userName: req.user.username,
        created: req.body.created
      })
      .then(createdMovie => {
        // res.status(201).json(createdMovie.serialize())
        Movie.findOne({_id: createdMovie._id})
        .populate({path: 'user_id'}) // mongoose method
        .then(foundMovie => {
          res.status(201).json(foundMovie)
        })
        
        
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
      })
    
    })

  
});

  
  
 
 module.exports = {router}
