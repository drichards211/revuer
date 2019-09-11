'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
const { app, runServer, closeServer } = require('../server')
const { User } = require('../users')
const { TEST_DATABASE_URL } = require('../config')
const expect = chai.expect

chai.use(chaiHttp)

describe('/api/user', function () {
  const userEmail = 'exampleEmail'
  const username = 'exampleUser'
  const password = 'examplePass'
  /* const firstName = 'Example' */
  /* const lastName = 'User' */
  const userEmailB = 'exampleEmailB'
  const usernameB = 'exampleUserB'
  const passwordB = 'examplePassB'
  /* const firstNameB = 'ExampleB' */
  /* const lastNameB = 'UserB' */

  before(function () {
    return runServer(TEST_DATABASE_URL)
  }) 

  after(function () {
    return closeServer() 
  }) 

  beforeEach(function () { }) 

  afterEach(function () {
    return User.remove({}) 
  }) 

  describe('/api/users', function () {
    describe('POST', function () {
      it('Should reject users with missing userEmail', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal('Missing field') 
            expect(res.body.location).to.equal('userEmail') 
          }) 
      }) 
      it('Should reject users with missing username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal('Missing field') 
            expect(res.body.location).to.equal('username') 
          }) 
      }) 
      it('Should reject users with missing password', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username,
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal('Missing field') 
            expect(res.body.location).to.equal('password') 
          }) 
      }) 
      it('Should reject users with non-string userEmail', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail: 1234,
            username,
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            ) 
            expect(res.body.location).to.equal('userEmail') 
          }) 
      }) 
      it('Should reject users with non-string username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username: 1234,
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            ) 
            expect(res.body.location).to.equal('username') 
          }) 
      }) 
      it('Should reject users with non-string password', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username,
            password: 1234
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            ) 
            expect(res.body.location).to.equal('password') 
          }) 
      })
      it('Should reject users with non-trimmed userEmail', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail: ` ${userEmail} `,
            username,
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            ) 
            expect(res.body.location).to.equal('userEmail') 
          }) 
      })  
      it('Should reject users with non-trimmed username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username: ` ${username} `,
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            ) 
            expect(res.body.location).to.equal('username') 
          }) 
      }) 
      it('Should reject users with non-trimmed password', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username,
            password: ` ${password} `
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            ) 
            expect(res.body.location).to.equal('password') 
          }) 
      }) 
      it('Should reject users with empty username', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username: '',
            password
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Must be at least 1 characters long'
            ) 
            expect(res.body.location).to.equal('username') 
          }) 
      }) 
      it('Should reject users with password less than ten characters', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username,
            password: '123456789'
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Must be at least 10 characters long'
            ) 
            expect(res.body.location).to.equal('password') 
          }) 
      }) 
      it('Should reject users with password greater than 72 characters', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username,
            password: new Array(73).fill('a').join('')
          })
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Must be at most 72 characters long'
            ) 
            expect(res.body.location).to.equal('password') 
          }) 
      }) 
      it('Should reject users with duplicate username', function () {
        // Create an initial user
        return User.create({
          userEmail,
          username,
          password
        })
          .then(() =>
            // Try to create a second user with the same username
            chai.request(app).post('/api/users').send({
              userEmail,
              username,
              password
            })
          )
          .then(() =>
            expect.fail(null, null, 'Request should not succeed')
          )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err 
            }

            const res = err.response 
            expect(res).to.have.status(422) 
            expect(res.body.reason).to.equal('ValidationError') 
            expect(res.body.message).to.equal(
              'Username already taken'
            ) 
            expect(res.body.location).to.equal('username') 
          }) 
      }) 
      it('Should create a new user', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            userEmail,
            username,
            password
          })
          .then(res => {
            expect(res).to.have.status(201) 
            expect(res.body).to.be.an('object') 
            expect(res.body).to.have.keys(
              'userEmail',
              'username'
            ) 
            expect(res.body.username).to.equal(username) 
            expect(res.body.userEmail).to.equal(userEmail)
            return User.findOne({
              username
            }) 
          })
          .then(user => {
            expect(user).to.not.be.null 
            return user.validatePassword(password) 
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true 
          }) 
      }) 
      /* it('Should trim firstName and lastName', function () {
        return chai
          .request(app)
          .post('/api/users')
          .send({
            username,
            password,
            firstName: ` ${firstName} `,
            lastName: ` ${lastName} `
          })
          .then(res => {
            expect(res).to.have.status(201) 
            expect(res.body).to.be.an('object') 
            expect(res.body).to.have.keys(
              'username',
              'firstName',
              'lastName'
            ) 
            expect(res.body.username).to.equal(username) 
            expect(res.body.firstName).to.equal(firstName) 
            expect(res.body.lastName).to.equal(lastName) 
            return User.findOne({
              username
            }) 
          })
          .then(user => {
            expect(user).to.not.be.null 
            expect(user.firstName).to.equal(firstName) 
            expect(user.lastName).to.equal(lastName) 
          }) 
      })  */
    }) 

    /* describe('GET', function () {
      it('Should return an empty array initially', function () {
        return chai.request(app).get('/api/users').then(res => {
          expect(res).to.have.status(200) 
          expect(res.body).to.be.an('array') 
          expect(res.body).to.have.length(0) 
        }) 
      }) 
      it('Should return an array of users', function () {
        return User.create(
          {
            userEmail,
            username,
            password
          },
          {
            userEmail: userEmailB,
            username: usernameB,
            password: passwordB
          }
        )
          .then(() => chai.request(app).get('/api/users'))
          .then(res => {
            expect(res).to.have.status(200) 
            expect(res.body).to.be.an('array') 
            expect(res.body).to.have.length(2) 
            expect(res.body[0]).to.deep.equal({
              userEmail,
              username
            }) 
            expect(res.body[1]).to.deep.equal({
              userEmail: userEmailB,
              username: usernameB
            }) 
          }) 
      }) 
    }) */ 
  }) 
}) 
