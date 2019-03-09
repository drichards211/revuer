"use strict";

const mongoose = require("mongoose");
const { User } = require("../users/models");

mongoose.Promise = global.Promise

const MovieSchema = mongoose.Schema({
  title: { type: String, required: true },
  apiMovieId: {type: String},
  viewed: { type: Date },
  rating: { type: String },
  ownCopy: { type: Boolean },
  format: [{ type: String }],
  viewingNotes: { type: String },
  userName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', MovieSchema)
module.exports = {Movie}

