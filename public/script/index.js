'use strict'

function handleUserNav() {
  /* Listens for any user button presses and calls appropriate function(s) */
  console.log('handleUserNav() running')
  $('body').on('click', 'button', function(event) {
    // sign-in button pressed:
    if (`${$(this).prop('id')}` === 'sign-in') {
      console.log("sign-in button pressed")
      renderSignInForm() // in user-auth.js
      handleFormSubmit()
    } 
    // sign-up button pressed:
    if (`${$(this).prop('id')}` === 'sign-up') {
      console.log("sign-up button pressed")
      renderSignUpForm() // in user-auth.js
      handleFormSubmit()
    } 
    // preview button pressed:
    if (`${$(this).prop('id')}` === 'preview') {
      console.log("preview button pressed")
      renderPreviewInfo() // in user-auth.js
    }
    // "Add a movie" button pressed:
    if (`${$(this).prop('id')}` === 'chair-1') {
      console.log("\"Add a movie\" button pressed")
      addMovie() // in add-movie.js
      handleFormSubmit()
    } 
    // "View your library" button pressed:
    if (`${$(this).prop('id')}` === 'chair-2') {
      console.log("chair-2 button pressed")
      viewLibrary()
      handleFormSubmit()
    } 
    // "About revuer" button pressed:
    if (`${$(this).prop('id')}` === 'chair-3') {
      console.log("chair-3 button pressed")
      aboutRevuer()
    }
  })
}

function viewLibrary() {
  const userToken = localStorage.getItem('auth')
  $('.video-screen').html(
    `<h2>Library</>`
  )
  if (userName !== "guest") {
    
  } else {
    // guest
  }
}
  
  
function testProtected() {
  fetch('/api/protected', {
    method: 'GET',
    /* body: JSON.stringify(signInData), */
    headers: {
      /* 'Accept': 'application/json', */
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    }
  })
  .then(res => {
    return res.json()
  })
  .then(responseJson => {
    console.log(responseJson)
  })
}

/* localStorage.setItem('auth', res.authToken)
      localStorage.setItem('user', username) */

function handleFormSubmit() {
/* Listens for user form submissions, and passes values to appropriate functions */
  console.log('handleFormSubmit() running')
  $('.signin-form').submit(function(event) {
    console.log('sign-in form submitted')
    event.preventDefault()
    const username = $('#username').val()
    const userPass =  $('#password').val()
    userSignIn(username, userPass) // in user-auth.js
  })
  $('.signup-form').submit(function(event) {
    console.log('sign-up form submitted')
    event.preventDefault()
    const userEmail = $('#email').val()
    const username = $('#username').val()
    const userPass =  $('#password').val()
    const userPass2 =  $('#password2').val()
    if (userPass === userPass2) {
      userSignUp(userEmail, username, userPass) // in user-auth.js
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

function renderChairButtons() {
  $('.chair-buttons').html(
  `<h4>chair buttons go here</h4>
  <button id="chair-1">Add a movie</button>
  <button id="chair-2">View your library</button>
  <button id="chair-3">About revuer</button>`
  )
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