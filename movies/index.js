'use strict'
const {User} = require('../users/models')
const {router} = require('./router')
const {Movie} = require('./models')

module.exports = {Movie, router, User}
