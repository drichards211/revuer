'use strict'

function handleUserNav() {
  /* Listens for any user button presses and calls appropriate function(s) */
  console.log('handleUserNav() running')
  $('body').on('click', 'button', function(event) {
    // sign-in button pressed:
    if (`${$(this).prop('id')}` === 'sign-in') {
      console.log("sign-in button pressed")
      userSignIn("drichards211", "1234567890")
      /* renderSignInForm() */ // in user-auth.js
    } 
    // sign-up button pressed:
    if (`${$(this).prop('id')}` === 'sign-up') {
      console.log("sign-up button pressed")
      renderSignUpForm() // in user-auth.js
    } 
    // preview button pressed:
    if (`${$(this).prop('id')}` === 'preview') {
      console.log("preview button pressed")
      userSignIn("Guest", "1234567890") // in user-auth.js
    }
    // "Manage your account" button pressed:
    if (`${$(this).prop('id')}` === 'manage-acct') {
      console.log("\"Manage account\" button pressed")
      manageUserAccount() // in user-auth.js
    } 
    // "Home" button pressed:
    if (`${$(this).prop('id')}` === 'chair-1') {
      console.log("\"Home\" button pressed")
      renderHomePage()
    } 
    // "Add a movie" button pressed:
    if (`${$(this).prop('id')}` === 'chair-2') {
      console.log("\"Add a movie\" button pressed")
      addMovie() // in add-movie.js
    } 
    // "View your library" button pressed:
    if (`${$(this).prop('id')}` === 'chair-3') {
      console.log("\"View your library\" button pressed")
      viewLibrary() // in view-library.js
    } 
    // "About revuer" button pressed:
    if (`${$(this).prop('id')}` === 'chair-4') {
      console.log("\"About revuer\" button pressed")
      aboutRevuer()
    }
  })
}

function handleLibraryNav() {
  console.log('handleLibraryNav() running')
  $('body').on('click', 'button', function(event) {
    // "movie-detail-0" button pressed:
    for (let i = 0; i < 100; i++) {
      if (`${$(this).prop('id')}` === `movie-detail-${i}`) {
        console.log(`"movie-detail-${i}" button pressed`)
        viewLibraryDetail(libraryResults[i].imdbId, i)
      } 
    }
  })
}

function renderHomePage() {
  console.log("renderHomePage() ran")
  if (userName === undefined) {
    $('.video-screen').html(
      `<h1>revuer</h1>
      <p class="js-test">animated text goes here</p>
      <div class="user-forms"></div>`
    )
    $('.dynamic-buttons').html(
      `<button class="ticket" id="sign-in">sign-in</button>
      <button class="ticket" id="sign-up">sign-up</button>
      <button class="ticket" id="preview">preview</button>`
    )
  } else if (userName !== "Guest") {
    welcomeUser(userName) // in user-auth.js
  } else {
    welcomeUser(userName, true) // in user-auth.js
  }
  
  
}

function oldTestProtected() {
  const userToken = localStorage.getItem('auth')
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

  /* fetch('/api/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    }
  })
  .then(res => {
    return res.json()
  })
  .then(responseJson => {
    localStorage.setItem('omdbApiKey', responseJson.authToken)
  }) */
  // localStorage.setItem('auth', responseJson.authToken)

  
function testProtected() {
  console.log("testProtected() ran")
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


// THIS FUNCTION IS DEPRACATED. PLEASE DELETE:
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
  `<h4>chair buttons:</h4>
  <button class="chair" id="chair-1">Home</button>
  <button class="chair" id="chair-2">Add a movie</button>
  <button class="chair" id="chair-3">View your library</button>
  <button class="chair" id="chair-4">About revuer</button>`
  )
}

function aboutRevuer() {
  console.log("aboutRevuer() ran")
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="about-revuer">
      <h2>About revuer</h2>
      <p>This is placeholder text about revuer</p>
    </div>`
  )
}

function updateDOMTest() {
  console.log("updateDOMTest() ran")
  $('.js-test').append(
    `<p>This is new text rendered by index.js</p>`)
}

$(function() {
  updateDOMTest()
  handleUserNav()
  handleLibraryNav()
  /* handleFormSubmit() */
})