'use strict'
let textAnimate
let mobileUserInput = false // true when form :input field is active on mobile display

function handleUserNav() {
  /* Listens for user button presses and calls appropriate function(s) */
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
      <button class="ticket" id="preview">preview</button>
      <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
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
  let mediaQuery = window.matchMedia("(max-width: 500px) and (orientation: portrait)")
  $('.chair-button-wrapper').empty()
  $('.chair-button-wrapper').html(
    `<div class="chair inline"></div>
    <div class="chair inline"></div>
    <div class="chair inline"></div>
    <div class="chair inline"></div>
    <div class="chair inline"></div>
    <div class="chair inline"></div>
    `
  )
  if (userName === undefined) {
    $('.chair-button-wrapper').append(
      `<div class="chair inline"></div>
      <div class="chair inline"></div>
      <div class="chair inline"></div>`
    )
  } else { 
    if (home) {
      $('.chair-button-wrapper').append(
        `<div class="chair inline"></div>`  
      )
    } else {
      $('.chair-button-wrapper').append(
        `<button class="chair-plaque" id="chair-1">HOME</button>`  
      )
    }
    $('.chair-button-wrapper').append(
      `<button class="chair-plaque" id="chair-2">ADD A MOVIE</button>
      <button class="chair-plaque" id="chair-3">VIEW LIBRARY</button>`
    )
  }
  $('.chair-button-wrapper').append(
  `<div class="chair inline"></div>
  <div class="chair inline"></div>
  <div class="chair inline"></div>
  <div class="chair inline"></div>
  <div class="chair inline"></div>
  <div class="chair inline"></div>
  <script>$('.chair-buttons').fadeIn();</script>`
  )
  if (mediaQuery.matches) {
  // Use larger font size for phone screens in portrait mode:
    $('.chair-plaque').fitText(1, 'compressor * 8')
  } else {
  // Use smaller font size:
    $('.chair-plaque').fitText()
  }
}

function aboutRevuer() {
// Display general information about the revuer app:
  console.log("aboutRevuer() ran")
  emptyTheContainers()
  /* $('.dynamic-buttons').empty() */
  $('.video-screen').removeClass('hidden').html(
    `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
    <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
    </video>
    <div class="about-revuer video-text blurred-text">
      <h2 class="blurred-more">About revuer</h2>
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

// Testing to see if this feature stays or goes:
function playCountdown() {
  console.log('playCountdown() ran')
  $('.video-screen').html(
    `<video id="film-leader" autoplay muted width="100%" height="auto" playsinline=""> 
    <source src="/image/film-leader-countdown-5.mp4" type="video/mp4">
    </video>`
  )
  let playPromise = document.querySelector('#film-leader').play()
  if (playPromise !== undefined) {
  // Browser supports media playback promises:
    console.log('Browser supports media playback promises:')
    playPromise.then(function() {
    // Automatic playback STARTED:
      console.log('Automatic playback STARTED:')
      console.log('Waiting for countdown video to end:')  
      document.getElementById('film-leader').addEventListener('ended', function() {
      // Wait for video to end, then call:
        playSilentLoop()
      })
    }).catch(function(error) {
    // Automatic playback FAILED. Jump immediately to silent-loop-video:
      console.log('Automatic playback FAILED, starting silent-loop-video:')
      playSilentLoop()
    })
  } else {
  // Browser doesn't support playback promises. Advance directly to:
    console.log('Browser doesn\'t support playback promises, skipping countdown video')
    playSilentLoop()
  }
}

function playSilentLoop() {
  console.log('playSilentLoop() ran')
  setTimeout(function() {
    $('.video-screen').append(
    `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
    <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
    </video>`
  )
}, 1000);
  $('.video-screen').html(
    `<div class="loop-text blurred-text">
      <h1 class="title blurred-more">revuer</h1>
      <p id="welcome-text-1" style="display: none;">Welcome to revuer</p>
      <p id="welcome-text-2" style="display: none;">Find movies you've watched</p>
      <p id="welcome-text-3" style="display: none;">Add reviews, ratings, and media</p> 
      <p id="welcome-text-4" style="display: none;">Save everything to your personal library</p>
      <p id="welcome-text-5" style="display: none;">RESERVED for future development</p>
      <div class="user-forms"></div>
    </div>`
  )
  $('.title').addClass('hidden')
  setTimeout(function() {
    $('.title').fadeIn(3000)
  }, 1000);
  setTimeout(function() { 
    /* $('.video-wrapper').removeClass('maintain-size') */
    textAnimate = true
    animateWelcomeText()
  }, 1600);
}

function animateWelcomeText(index) {
// Cycle through #welcome-text messages in .video-screen:
  let i = index || 0
  if (textAnimate === false) {
  // Hide all welcome-text:
    console.log(`animateWelcomeText() stopped`)
    for (let j = 1; j < 3; j++) {
      $(`#welcome-text-${j}`).fadeOut(2000)
    }
  } else if (i === 0) {
  // Start the loop from the beginning:
    $(`#welcome-text-1`).fadeIn(2000)
    animateWelcomeText(1)
  } else {
  // Continue the loop:
    console.log(`animateWelcomeText() loop ${i} of 4`)
    setTimeout(function() {
      $(`#welcome-text-${i}`).fadeOut(2000, function() {
        if (i === 4) {
        // End reached. Restart the loop from the beginning:
          animateWelcomeText(0)
        } else {
        // Continue the loop:
          $(`#welcome-text-${i + 1}`).fadeIn(2000)
          animateWelcomeText(i + 1);
        }
      })
    }, 3000);
  }
}

function emptyTheContainers() {
// Hide the .video-screen, remove dynamic buttons, empty the main content window,
// reset scroll position to (0, 0), and stop any ongoing text-animations.
  console.log('emptyTheContainers() ran')
  textAnimate = false
  mobileUserInput = false
  window.scrollTo(0, 0)
  $('.video-screen').empty().addClass('hidden').css({'display': ''})
  $('.dynamic-buttons, .film-button-wrapper').empty().unbind('click')
  $('.movie-marquee').empty()
}

function manageWindowResize() {
// The navigation buttons and movie-screen automatically resize in css as the 
// viewport shrinks. This function determines the current width of these elements 
// and updates their wrappers to keep the buttons centered, as well as preserving 
// the 16x9 aspect ratio of the movie-screen.
  console.log("manageWindowResize() running")
// set initial values: 
  console.log("setting initial theater size") 
  let initialVideoScreenWidth = $('.video-screen').css('width')
  let mediaQuery = window.matchMedia("(max-width: 500px)")
  let initialFilmButtonWidth = (mediaQuery.matches) ? "33vw" : "12rem"
  $('.video-screen').css({'height': `calc(${initialVideoScreenWidth} * .5620)`})
  $('.film-button-wrapper').css({'width': `calc(${initialFilmButtonWidth} * 18)`,'transform': `translateX(calc(((${initialFilmButtonWidth} * 18) - 100vw)* -.5))`})
// Update values if window resized:
  window.onresize = function() {
    console.log("Window size changed... resizing theater")
    let videoScreenWidth = $('.video-screen').css('width')
    let filmButtonWidth = (mediaQuery.matches) ? "33vw" : "12rem"
    $('.video-screen').css({'height': `calc(${videoScreenWidth} * .5620)`})
    $('.film-button-wrapper').css({'width': `calc(${filmButtonWidth} * 18)`, 'transform': `translateX(calc(((${filmButtonWidth} * 18) - 100vw)* -.5))`})
  }
}

function hideChairs() {
// Hide the chairs when scrolling if viewport is < 700px tall and landscape:
  console.log("hideChairs() running")
  let lastScrollPosition = 0
  let mobileInputField = function() {
    return mobileUserInput
  }
  let showChairs = function() {
    if (!mobileInputField()) { // Only display chairs if :input field is inactive on mobile
      console.log('showing chairs')
      $('.chair-buttons').css({"display": "block"}) 
      renderChairButtons()  // Force re-draw of chair buttons
    }
  }
  $(window).scroll(function() {
    let mediaQuery = window.matchMedia("(max-height: 700px) and (orientation: landscape)")
    let currentScroll = $(this).scrollTop()
    if ((mediaQuery.matches) && (!mobileInputField())) {
      if (currentScroll > lastScrollPosition) {
      // User is scrolling down: 
        console.log("hiding chairs")
        $('.chair-buttons').fadeOut()
      } else {
      // User is scrolling up:
        console.log('showing chairs')
        $('.chair-buttons').fadeIn()
      }
      lastScrollPosition = currentScroll
    }
  })
  // Restore chair visibility if viewport resized or rotated:
  window.addEventListener('resize', showChairs)
}

function hideMobileChairs() {
  // Hide chair buttons if form :input fields have focus on mobile devices. Must call AFTER :input fields are rendered.
  console.log("hideMobileChairs() running")
  $("form :input").focus(function(event) {
    /* Input field has focus; hide chair buttons if soft-keyboard active */
    event.preventDefault()
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      console.log("Soft-keyboard detected: hiding the chair buttons")
      mobileUserInput = true
      $('.chair-buttons').fadeOut()
    }
  })
  $("form :input").blur(function(event) {
    /* Input field is no longer in focus; restore chair buttons if hidden */
      event.preventDefault()
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        console.log('Soft-keyboard retracted: restoring the chair buttons')
        mobileUserInput = false
        $('.chair-buttons').fadeIn(100)
      }
  })
}

$(function() {
  handleUserNav()
  manageWindowResize()
  hideChairs()
  playCountdown()
})