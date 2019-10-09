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
        if (previewLibrary.length > 6) {
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
      <div class="welcome-message video-text">
        <h2>Welcome to revuer, ${user}</h2>
        <p>Please click any of the chair buttons below to continue. Have fun revue-ing your movie experiences!</p>`
      )
      {/*  */}
      if (addMovies) {
        console.log("Adding additional welcome message")
        const plural = previewLibrary.length > 7 ? "movies have" : "movie has";
        $('.welcome-message').append(
          `<p>Your ${plural} been added to your library.</p>`
        )
      }
      if (userName === "Guest") {
        $('.dynamic-buttons').html(
          `<button class="ticket" id="sign-up">sign-up</button>
          <button class="ticket" id="sign-in">sign-in</button>
          <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
        )
      }
    } else {
      $('.video-screen').removeClass('hidden').html(
        `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
        <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
        </video>
        <div class="welcome-messsage video-text">
          <h2>Welcome back ${user}</h2>
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
  $('.dynamic-buttons').html(
    `<button class="ticket" id="sign-in">sign-in</button>
    <button class="ticket" id="sign-up">sign-up</button>
    <button class="ticket" id="preview">preview</button>
    <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
  )
  $('.video-screen').removeClass('hidden').html(
    `<div class="signin-box">
      <form class="signin-form" action="#">
        <h2>Sign in</h2>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="myusername" autocomplete="username" maxlength="72" required autofocus/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd" autocomplete="current-password" minlength="10" maxlength="72" required/>
        <button type="submit">Sign in</button>
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
}

function renderSignUpForm() {
  console.log("renderSignUpForm() ran")
  $('.dynamic-buttons').html(
    `<button class="ticket" id="sign-in">sign-in</button>
    <button class="ticket" id="sign-up">sign-up</button>
    <button class="ticket" id="preview">preview</button>
    <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
  )
  $('.video-screen').removeClass('hidden').html(
    `<div class="signup-box">
      <form class="signup-form" action="#">
        <h2>Sign up</h2>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="user@domain.com" required autofocus/>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="mynewusername" autocomplete="username" required/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd" autocomplete="new-password" minlength="10" maxlength="72" required/>
        <label for="password">Re-enter password</label>
        <input type="password" name="password" id="password2" placeholder="1234passw0rd" autocomplete="new-password" minlength="10" maxlength="72" required/>
        <button type="submit">Sign up</button>
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
}

function renderPreviewInfo() {
  console.log("renderPreviewInfo() ran")
  emptyTheContainers() // in index.js
  $('.video-screen').removeClass('hidden').html(
    `<video id="silent-loop" autoplay muted id="film-leader" width="100%" height="auto" playsinline="" loop="" poster="/image/silent-film-loop-480.jpg"> 
    <source src="/image/silent-film-loop-480.mp4" type="video/mp4">
    </video>
    <div class="preview-info video-text">
      <h2>Welcome Guest</h2>
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
