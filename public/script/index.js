'use strict'

function handleUserNav() {
  /* Listens for user button presses and calls appropriate functions */
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
    // "Add a movie" chair button pressed:
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
    // "Add a movie" dynamic button pressed:
    if (`${$(this).prop('id')}` === 'film-2') {
      console.log('"Add a movie" button clicked')
      addMovie()
    }
    // "Return to library" button pressed:
    if (`${$(this).prop('id')}` === 'film-4') {
      console.log('"Return to library" button pressed')
      viewLibrary()
    }
  })
}

function renderHomePage() {
  console.log("renderHomePage() ran")
  if (userName === undefined) {
    emptyTheContainers()
    $('.video-screen').removeClass('hidden').html(
      `<h1>revuer</h1>
      <p class="js-test">animated text goes here</p>
      <div class="user-forms"></div>`
    )
    $('.dynamic-buttons').html(
      `<button class="ticket" id="sign-in">sign-in</button>
      <button class="ticket" id="sign-up">sign-up</button>
      <button class="ticket" id="preview">preview</button>`
    )
  } else if (userName === "Guest") {
    welcomeUser(userName, true) // in user-auth.js
  } else {
    welcomeUser(userName) // in user-auth.js
  }
}

function testProtected() {
// Test user access to protected server endpoints:
  console.log("testProtected() ran")
  const userToken = localStorage.getItem('auth')
  fetch('/api/protected', {
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
    console.log(responseJson)
  })
}

function renderChairButtons() {
  $('.chair-buttons').html(
  `<button class="chair" id="chair-1">Home</button>
  <button class="chair" id="chair-2">Add a movie</button>
  <button class="chair" id="chair-3">View library</button>
  <button class="chair" id="chair-4">About revuer</button>`
  )
}

function aboutRevuer() {
// Display general information about the revuer app:
  console.log("aboutRevuer() ran")
  emptyTheContainers()
  /* $('.dynamic-buttons').empty() */
  $('.video-screen').removeClass('hidden').html(
    `<div class="about-revuer">
      <h2>About revuer</h2>
      <p>This is placeholder text about revuer</p>
    </div>`
  )
}

function updateDOMTest() {
// Tests live updating of html:
  console.log("updateDOMTest() ran")
  $('.js-test').append(
    `<p>This is new text rendered by index.js</p>`)
}

function playCountdown() {
  $('.video-screen').html(
    `<video autoplay width="100%" height="calc(80vw * .5625)"> 
    <source src="/image/film-leader-countdown-sound.mp4" type="video/mp4">
    <video>`
  )
  setTimeout(function() { 
    $('.video-screen').html(
      `<img src="image/still-frame.jpg" alt="movie still frame" style="width:100%;height:auto;">
      <div class="video-text">
        <h1>revuer</h1>
        <p class="js-test">animated text goes here</p>
        <div class="user-forms"></div>
      </div>`
    ) 
  }, 5000);
  
  // Use this event listener instead of setTimeout in case video is slow to load:
  /* document.getElementById('myVideo').addEventListener('ended',myHandler,false);
  function myHandler(e) {
      // What you want to do after the event
  } */
  // Add a nice, grainy, still image for the default .video-screen display
  // fade-in reviewer text. Add animated transitions

}

function emptyTheContainers() {
  $('.video-screen').empty().addClass('hidden')
  $('.dynamic-buttons').empty()
  $('.movie-marquee').empty()
}

$(function() {
  handleUserNav()
  playCountdown()
})