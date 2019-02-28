'use strict'

function handleUserNav() {
  console.log('handleUserNav() running')
  $('body').on('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'sign-in') {
      console.log("sign-in button pressed")
      renderSignInForm()
      handleFormSubmit()
    } 
    if (`${$(this).prop('id')}` === 'sign-up') {
      console.log("sign-up button pressed")
      renderSignUpForm()
      handleFormSubmit()
    } 
    if (`${$(this).prop('id')}` === 'preview') {
      console.log("preview button pressed")
      renderPreviewInfo()
    }
    if (`${$(this).prop('id')}` === 'chair-1') {
      console.log("chair-1 button pressed")
    } 
    if (`${$(this).prop('id')}` === 'chair-2') {
      console.log("chair-2 button pressed")
    } 
    if (`${$(this).prop('id')}` === 'chair-3') {
      console.log("chair-3 button pressed")
    } 
  })
}

function handleFormSubmit() {
  console.log('handleFormSubmit() running')
  $('.signin-form').submit(function(event) {
    console.log('sign-in form submitted')
    event.preventDefault()
    const username = $('#username').val()
    const userPass =  $('#password').val()
    userSignIn(username, userPass)
  })
  $('.signup-form').submit(function(event) {
    console.log('sign-up form submitted')
    event.preventDefault()
    const userEmail = $('#email').val()
    const username = $('#username').val()
    const userPass =  $('#password').val()
    userSignUp(userEmail, username, userPass)
  })
  $('.movie-search-form').submit(function(event) {
    console.log('movie-search-form submitted')
    event.preventDefault()
  })
  $('.movie-post-form').submit(function(event) {
    console.log('movie-post-form submitted')
    event.preventDefault()
  })
}

function userSignIn(username, pword) {
  console.log("userSignIn() ran")
  console.log(`Username = ${username}, User Password = ${pword}`)
}

function userSignUp(email, username, pword) {
  console.log("userSignUp() ran")
  console.log(`User email = ${email}, Username = ${username}, User Password = ${pword}`)
}


function renderSignInForm() {
  console.log("renderSignInForm() ran")
  $('.video-screen').html(
    `<div class="signin-box">
      <form class="signin-form" action="#">
        <h2>Sign in</h2>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="myusername"/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd"/>
        <button type="submit">Sign in</button>
      </form>
    </div>`)
}

function renderSignUpForm() {
  console.log("renderSignUpForm() ran")
  $('.video-screen').html(
    `<div class="signup-box">
      <form class="signup-form" action="#">
        <h2>Sign up</h2>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="user@domain.com"/>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="mynewusername"/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd"/>
        <button type="submit">Sign up</button>
      </form>
    </div>`)
}

function renderPreviewInfo() {
  console.log("renderPreviewInfo() ran")
  $('.video-screen').html(
    `<div class="preview-info">
      <p>This is a preview<p>
      <p>Here are some instructions</p>`)
}

function updateDOMTest() {
  console.log("updateDOMTest ran")
  $('.js-test').append(
    `<p>This is new text rendered by index.js</p>`)
}

$(function() {
  updateDOMTest()
  handleUserNav()
})