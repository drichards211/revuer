"use strict";

global.DATABASE_URL = 'mongodb://localhost/revuer-db-test'
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require("chai-http")
const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp)

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