'use strict'
let textAnimate

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
      renderChairButtons()
      addMovie() // in add-movie.js
    } 
    // "View your library" button pressed:
    if (`${$(this).prop('id')}` === 'chair-3') {
      console.log("\"View your library\" button pressed")
      renderChairButtons()
      viewLibrary() // in view-library.js
    } 
    // "About revuer" button pressed:
    if (`${$(this).prop('id')}` === 'chair-4') {
      console.log("\"About revuer\" button pressed")
      renderChairButtons()
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
    $('.video-screen').removeClass('hidden')
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

function renderChairButtons(home) {
  console.log('renderChairButtons() ran')
  const chairOne = '<button class="chair" id="chair-1">HOME</button>'
  $('.chair-buttons').empty()
  if (home) {
    $('.chair-buttons').html(
      `<button class="chair" id="chair-4">ABOUT REVUER</button>`  
    )
  } else {
    $('.chair-buttons').html(
      `<button class="chair" id="chair-1">HOME</button>`  
    )
  }
  $('.chair-buttons').append(
  `<button class="chair" id="chair-2">ADD A MOVIE</button>
  <button class="chair" id="chair-3">VIEW LIBRARY</button>`
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
  $('.dynamic-buttons').addClass('keep-below-screen')
  $('.video-screen').html(
    `<video controls autoplay id="film-leader" width="100%" height="auto"> 
    <source src="/image/film-leader-countdown-4.mp4" type="video/mp4">
    <video>`
  )
  document.getElementById('film-leader').addEventListener('ended', function() {
    $('.video-screen').addClass('hidden').html(
      `<div class="video-text">
        <h1>revuer</h1>
        <p id="welcome-text-1" style="display: none;">animated text 1</p>
        <p id="welcome-text-2" style="display: none;">animated text 2</p>
        <p id="welcome-text-3" style="display: none;">animated text 3</p>
        <p id="welcome-text-4" style="display: none;">animated text 4</p>
        <p id="welcome-text-5" style="display: none;">animated text 5</p>
        <div class="user-forms"></div>
      </div>`
    )
    setTimeout(function() { 
      $('.video-screen').fadeIn(3000)
      $('.dynamic-buttons').removeClass('keep-below-screen')
      textAnimate = true
      animateWelcomeText()
    }, 800);
  })
  
}

function animateWelcomeText(index) {
  let i = index || 1
  if (textAnimate === false) {
    console.log(`animateWelcomeText() stopped`)
    // Hide all welcome-text:
    for (let j = 1; j < 6; j++) {
      $(`#welcome-text-${j}`).fadeOut(2000)
    }
  } else if (i === 1) {
    console.log(`animateWelcomeText() loop 1 of 5`)
    $(`#welcome-text-1`).fadeIn(2000, function() {
      setTimeout(function() {
        $(`#welcome-text-1`).fadeOut(2000, function() {
          $(`#welcome-text-2`).fadeIn(2000)
          animateWelcomeText(2)
        })
      }, 1000)
    })
  } else {
    console.log(`animateWelcomeText() loop ${i} of 5`)
    setTimeout(function() {
      $(`#welcome-text-${i}`).fadeOut(2000, function() {
        $(`#welcome-text-${i + 1}`).fadeIn(2000)
        if (i === 5) {
          animateWelcomeText(1)
        } else {
          animateWelcomeText(i + 1);
        }
      })
    }, 3000);
  }
}
  
  
  
  /* for (let i = 1; i < 6; i++) {
    (function(index) {
      let timeout = 3000
      setTimeout(function() {
        console.log( `#${index} loop`)
        $(`.welcome-text-${index}`).fadeOut(2000)
        $(`.welcome-text-${index + 1}`).fadeIn(2000)
      }, timeout)
      timeout = timeout + 3000
    })
  } */

    
function emptyTheContainers() {
  console.log('emptyTheContainers() ran')
  $('.dynamic-buttons').removeClass('keep-below-screen')
  $('.video-screen').empty().addClass('hidden').removeAttr('style')
  $('.dynamic-buttons').empty()
  $('.dynamic-buttons').unbind('click', 'button')
  $('.movie-marquee').empty()
  textAnimate = false
}

$(function() {
  handleUserNav()
  playCountdown()
})