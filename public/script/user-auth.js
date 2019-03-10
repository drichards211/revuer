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
    if (res.ok){ 
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
      localStorage.setItem('auth', responseJson.authToken)
      userName = username
      getOmbdApiKey()
      /* localStorage.setItem('user', username) */
      if (firstTime === true) {
        welcomeUser(username, true)
      } else {
        welcomeUser(username)
      }
    }
  })
  .catch(err => {
    console.log("userSignIn() encountered an error")
    // ok to use an alert here
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
    // ok to use an alert here
  })
}

function handleSignUpError(results) {
  console.log("handleSignUpError() ran")
  console.log(results.location + " " + results.message)
}

function handleSignInError() {
  console.log("handleSignInError() ran")
  console.log("Incorrect username or password")
}

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

function renderSignInForm() {
  console.log("renderSignInForm() ran")
  $('.video-screen').html(
    `<div class="signin-box">
      <form class="signin-form" action="#">
        <h2>Sign in</h2>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="myusername" autocomplete="username" required/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd" autocomplete="current-password" required/>
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
        <input type="email" name="email" id="email" placeholder="user@domain.com" required/>
        <label for="username">Username</label>
        <input type="text" name="username" id="username" placeholder="mynewusername" autocomplete="username" required/>
        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="1234passw0rd" autocomplete="new-password" required/>
        <label for="password">Re-enter password</label>
        <input type="password" name="password" id="password2" placeholder="1234passw0rd" autocomplete="new-password" required/>
        <button type="submit">Sign up</button>
      </form>
    </div>`)
}

function renderPreviewInfo() {
  console.log("renderPreviewInfo() ran")
  userName = "Guest"
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="preview-info">
      <h2>Welcome Guest!</h2>
      <p>This is a sneak preview of revuer.</p>
      <p>A sample library has been created for you.</p>
      <p>Please click any of the chair buttons below to continue.</p>`
    )
  renderChairButtons() // in index.js
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
    })
}
