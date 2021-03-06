'use strict'

let userName

function userSignIn(username, pword, firstTime) {
  console.log("userSignIn() ran")
  let success
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
  .then(res => {
    if (res.ok) { 
      console.log("response OK")
      success = true
      return res.json()
    } else if (res.status === 401) {
        console.log("res.status === 401")
        success = false
        handleSignInError(res)
    } else {
        console.log("final else-statement reached")
        throw new Error(res.statusText)
    }
  })
  .then(responseJson => {
    if (success === true) {
      console.log("Sign-in successful")
      console.log(`username = ${username}`)
      userName = username
      localStorage.setItem('auth', responseJson.authToken)
      getOmbdApiKey()
      if (firstTime) {
        if (previewLibrary.length > 8) {
          addGuestMoviesToDb() // in add-movie.js
          welcomeUser(username, firstTime, true)
        } else {
          welcomeUser(username, firstTime)
        }
      } else if (username !== "Guest") {
        welcomeUser(username)
      } else {
        renderPreviewInfo()
      } 
    }
  })
  .catch(err => {
    console.log("userSignIn() encountered an error")
  })
}

function userSignUp(email, username, pword) {
  console.log("userSignUp() ran")
  let success
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
  .then(res => {
    if (res.ok) { 
      console.log("response OK")
      success = true
      return res.json()
    } else if (res.status === 422) {
        console.log("res.status === 422")
        success = false
        return res.json()
    } else {
        throw new Error(res.statusText)
    }
  })
  .then(res => {
    if (success === true) {
      userSignIn(username, pword, true)
    } else {
        console.log(res)
        handleSignUpError(res)
    }
  })
  .catch(err => {
    console.log(err)
    console.log("userSignUp() encountered an unexpected error")
  })
}

function handleSignUpError(results) {
// Display error to user if sign-up unsuccessful:
  console.log("handleSignUpError() ran")
  console.log(results.location + " " + results.message)
  $('.form-errors').html(
    `<p>${results.message}</p>`
  )
}

function handleSignInError() {
// Display error to user if sign-in unsuccessful:
  console.log("handleSignInError() ran")
  console.log("Incorrect username or password")
  $('.form-errors').html(
    `<p>Incorrect username or password</p>`
  )
}

function welcomeUser(user, firstTime, addMovies) {
// Render custom welcome screen after successful sign-in: 
  console.log("welcomeUser() ran")
  emptyTheContainers() // in index.js
  renderChairButtons("home")
  if (firstTime) {
    $('.video-screen').removeClass('hidden').html(
      `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
      <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
      </video>
      <div class="welcome-message video-text blurred-text">
        <h2 class="blurred-more">Welcome to revuer, ${user}</h2>
        <p>Please click any of the chair buttons below to continue. Have fun revue-ing your movie experiences!</p>`
      )
      if (addMovies) {
        console.log("Adding additional welcome message")
        const plural = previewLibrary.length > 9 ? "movies have" : "movie has";
        $('.welcome-message').append(
          `<p>Your ${plural} been added to your library.</p>`
        )
      }
      if (userName === "Guest") {
        $('.dynamic-buttons').html(
          `<button class="ticket" id="sign-in">sign-in</button>
          <button class="ticket" id="sign-up">sign-up</button>
          <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
        )
      }
    } else {
      $('.video-screen').removeClass('hidden').html(
        `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
        <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
        </video>
        <div class="welcome-messsage video-text blurred-text">
          <h2 class="blurred-more">Welcome back ${user}</h2>
      `)
      $('.dynamic-buttons').html(
        `<button class="ticket" id="manage-acct">Manage<br>account</button>
        <script>$('.ticket').fitText(1, 'compressor * 4.9');</script>`
      )
    }
}

function manageUserAccount() {
  console.log("manageUserAccount() ran")
}

function renderSignInForm() {
  console.log("renderSignInForm() ran")
  emptyTheContainers()
  $('.dynamic-buttons').html(
    `<button class="ticket" id="sign-in">sign-in</button>
    <button class="ticket" id="sign-up">sign-up</button>
    <button class="ticket" id="preview">preview</button>
    <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
  )
  $('.movie-marquee').html(
    `<div class="signin-box">
      <form class="signin-form" action="#">
        <h1>revuer</h1>
        <p><label for="username">username</label><br>
        <input type="text" name="username" id="username" autocomplete="username" maxlength="72" required/></p>
        <p><label for="password">password</label><br>
        <input type="password" name="password" id="password" autocomplete="current-password" minlength="10" maxlength="72" required/><br></p>
        <button type="submit">SIGN IN</button>
      </form>
      <div class="form-errors"></div>
    </div><br>`
  )
  $('.signin-form').submit(function(event) {
    console.log('sign-in form submitted')
    event.preventDefault()
    const username = $('#username').val()
    const userPass =  $('#password').val()
    userSignIn(username, userPass)
  })
  hideMobileChairs() // in index.js
}

function renderSignUpForm() {
  console.log("renderSignUpForm() ran")
  emptyTheContainers()
  $('.dynamic-buttons').html(
    `<button class="ticket" id="sign-in">sign-in</button>
    <button class="ticket" id="sign-up">sign-up</button>
    <button class="ticket" id="preview">preview</button>
    <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
  )
  $('.movie-marquee').html(
    `<div class="signup-box">
      <form class="signup-form" action="#">
        <h1>revuer</h1>
        <p><label for="email">email</label><br>
        <input type="email" name="email" id="email" required/><br></p>
        <label for="username">username</label><br>
        <input type="text" name="username" id="username" autocomplete="username" required/><br>
        <p><label for="password">password</label><br>
        <input type="password" name="password" id="password" autocomplete="new-password" minlength="10" maxlength="72" required/></p>
        <p><label for="password">re-enter password</label><br>
        <input type="password" name="password" id="password2" autocomplete="new-password" minlength="10" maxlength="72" required/></p>
        <button type="submit">SIGN UP</button>
      </form>
      <div class="form-errors"></div>
    </div><br>`
  )
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
      $('.form-errors').html(
        `<p>Passwords don't match</p>`  
      )
    }
  })
  hideMobileChairs() // in index.js
}

function renderPreviewInfo() {
  console.log("renderPreviewInfo() ran")
  emptyTheContainers() // in index.js
  $('.video-screen').removeClass('hidden').html(
    `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
    <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
    </video>
    <div class="preview-info video-text blurred-text">
      <h2 class="blurred-more">Welcome Guest</h2>
      <p>This is a sneak preview of revuer. A sample library has been created for you.</p>
    </div>`
  )
    {/* <p>Please click any of the chair buttons below to continue.</p> */}
  renderChairButtons("home") // in index.js
}

function getOmbdApiKey() {
// retrieve protected OMDB API key from server and write to localStorage:
  console.log("getOmdbApiKey() ran")
  const userToken = localStorage.getItem('auth')
    fetch('/api/omdbapikey', {
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
      localStorage.setItem('omdbApiKey', responseJson.data)
      console.log("omdbApiKey successfully written into local storage")
    })
    .catch(err => {
      console.log("getOmdbApiKey() encountered an error")
      console.log(err)
    })
}
