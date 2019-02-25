"use strict";

require('dotenv').config() // This is the missing line which is needed for .env values to be read.
// Must be included in all test files.
/* const {TEST_DATABASE_URL} = 'mongodb://localhost/revuer-db-test' */
const {JWT_SECRET, TEST_DATABASE_URL} = require('../config')
/* global.DATABASE_URL = 'mongodb://localhost/revuer-db-test' */
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require("chai-http")
const {app, runServer, closeServer} = require('../server')

chai.use(chaiHttp)

describe('server starting', function(){
  before(function() {
      runServer(TEST_DATABASE_URL)
  })
  after(function() {
  return closeServer()
  })
})

describe("index.html page", function() {
  it("should exist", function() {
    return chai
      .request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200)
      })
  })
})