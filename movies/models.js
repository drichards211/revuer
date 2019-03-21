"use strict";

const mongoose = require("mongoose");
const { User } = require("../users/models");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.Promise = global.Promise

const MovieSchema = mongoose.Schema({
  title: { type: String, required: true, },
  imdbId: {type: String, required: true },
  rating: { type: String, required: true },
  ownCopy: { type: Boolean, required: true },
  format: [{ type: String }],
  viewingNotes: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now, required: true }
});

MovieSchema.methods.serialize = function() {
  return {
    title: this.title,
    imdbId: this.imdbId,
    rating: this.rating,
    ownCopy: this.ownCopy,
    format: this.format,
    viewingNotes: this.viewingNotes,
    user_id: this.user_id,
    created: this.created,
  };
}

const Movie = mongoose.model('Movie', MovieSchema)
module.exports = {Movie}

