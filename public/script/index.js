'use strict'

function handleUserNav() {
  /* Listens for any user button presses and calls appropriate function(s) */
  console.log('handleUserNav() running')
  $('body').on('click', 'button', function(event) {
    // sign-in button pressed:
    if (`${$(this).prop('id')}` === 'sign-in') {
      console.log("sign-in button pressed")
      renderSignInForm() // in user-auth.js
    } 
    // sign-up button pressed:
    if (`${$(this).prop('id')}` === 'sign-up') {
      console.log("sign-up button pressed")
      renderSignUpForm() // in user-auth.js
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
    } 
    // "View your library" button pressed:
    if (`${$(this).prop('id')}` === 'chair-2') {
      console.log("\"View your library\" button pressed")
      viewLibrary()
    } 
    // "About revuer" button pressed:
    if (`${$(this).prop('id')}` === 'chair-3') {
      console.log("\"About revuer\" button pressed")
      aboutRevuer()
    }
  })
}

function viewLibrary() {
  console.log("viewLibrary() ran")
  const userToken = localStorage.getItem('auth')
  const thumbsUp = "^" // update this to contain html "thumbsUp" IMG
  const thumbsDown = "v" // update this to contain html "thumbsDown" IMG
  const complicated = ":/" // update this to contain html "complicated" IMG

  $('.video-screen').html(
    `<h2>Library</h2>
    <div class="movie-list">
    </div>`
  )
  if (userName !== "Guest") {
    // Display user library results:
    
  } else {
    // Display Sample Library for "guest":
    for (let i = 0; i < previewLibrary.length; i++) {
      const rating = eval(`${previewLibrary[i].rating}`)
      $('.movie-list').append(
        `<button id="movie-detail-${i}">
          ${previewLibrary[i].title} ${rating}
        </button>`
      )
    }
  }
}

function handleLibraryNav() {
  console.log('handleLibraryNav() running')
  $('body').on('click', 'button', function(event) {
    // "movie-detail-0" button pressed:
    for (let i = 0; i < 10; i++) {
      if (`${$(this).prop('id')}` === `movie-detail-${i}`) {
        console.log(`"movie-detail-${i}" button pressed`)
      } 
    }
  })
}

function viewLibraryDetail() {
  console.log("viewLibraryDetail() ran")

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

function aboutRevuer() {
  console.log("aboutRevuer() ran")
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