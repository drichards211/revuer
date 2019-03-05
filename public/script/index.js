'use strict'

function handleUserNav() {
  /* Listens for any user button presses and calls appropriate function(s) */
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
/* Listens for user form submissions, and passes values to appropriate functions */
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
    const userPass2 =  $('#password2').val()
    if (userPass === userPass2) {
      userSignUp(userEmail, username, userPass)
    } else if (userPass !== userPass2) {
        alert("Passwords don't match")
      }
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

function userSignIn(username, pword, firstTime) {
  console.log("userSignIn() ran")
  /* console.log(`Username = ${username}, User Password = ${pword}`) */
  /* let bearer; */
  const signInData = {
    "username": `${username}`,
    "password": `${pword}`
  }
  fetch('api/auth/login', {
    method: 'POST',
    body: JSON.stringify(signInData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok){ 
      return response.json()
    } 
    throw new Error(response.statusText)
  })
  .then(response => {
    localStorage.setItem('auth', response.authToken)
    localStorage.setItem('user', username)     
  })
  .then(response => {
    /* const {reason, message, location} = response */
    if (firstTime === true) {
      welcomeUser(username, true)
    } else {
      welcomeUser(username)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

function userSignUp(email, username, pword) {
  console.log("userSignUp() ran")
  /* console.log(`User email = ${email}, Username = ${username}, User Password = ${pword}`) */
  const signUpData = {
    "userEmail": `${email}`,
    "username": `${username}`,
    "password": `${pword}`
  }
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(signUpData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok){ 
      return response.json()
    } 
    throw new Error(response.statusText)
  })
  .then(results => {
    console.log("success!")
    userSignIn(username, pword, true)
    const {reason, message, location} = results
    console.log(message)
  })
    
    /* if (response.ok) { 
      return response.json()
    } else {
      console.log(response.sendStatus) */
      /* throw new Error(response.sendStatus) */
    
    
  
  /* .then(responseJson => {  */
    /* if (response.status === 422){
      console.log(responseJson) */
      /* const {reason, message, location} = response.body
      console.log(message) */
    /* } */
    /* return response.json();
    console.log(response.json);
    welcomeNewUser(username)
  }) */
  .catch(err => {
    console.log(err)
  })
}

/* function getWebToken(signInData) {
  console.log("getWebToken() ran")
  fetch('endpoint', {

  }

  )
} */

  
function welcomeUser(user, firstTime) {
/* Renders custom welcome screen after successful sign-in*/
  console.log("welcomeUser() ran")
  $('.dynamic-buttons').empty()
  renderChairButtons()
  if (firstTime === true) {
    $('.video-screen').html(
      `<div class="welcome-messsage">
          <h2>Welcome to revuer, ${user}!</h2>
          <p>Please click any of the chair buttons below to continue.</p>
          <p>Have fun revue-ing your movie experiences!</p>
      `)
  } else {
    $('.video-screen').html(
      `<div class="welcome-messsage">
          <h2>Welcome back ${user}!</h2>
      `)
  }
}

function renderChairButtons() {
  $('.chair-buttons').html(
  `<h4>chair buttons go here</h4>
  <button id="chair-1">Add a movie</button>
  <button id="chair-2">View your library</button>
  <button id="chair-3">About revuer</button>`
  )
}

function renderSignInForm() {
  console.log("renderSignInForm() ran")
  $('.video-screen').html(
    `<div class="signin-box">
      <form class="signin-form" action="#">
        <h2>Sign in</h2>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="myusername" autocomplete="username"/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd" autocomplete="current-password"/>
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
        <input type="text" name="username" id="username" placeholder="mynewusername" autocomplete="username"/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd" autocomplete="new-password"/>
        <label for="password">Re-enter password</label>
        <input type="password" name="password" id="password2" placeholder="1234passw0rd" autocomplete="new-password"/>
        <button type="submit">Sign up</button>
      </form>
    </div>`)
}

function renderPreviewInfo() {
  console.log("renderPreviewInfo() ran")
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="preview-info">
      <h2>Welcome Guest!</h2>
      <p>This is a sneak preview of revuer.</p>
      <p>A sample library has been created for you.</p>
      <p>Please click any of the chair buttons below to continue.</p>`
    )
  renderChairButtons()
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