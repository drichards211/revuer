'use strict'

function addMovie(oldSearch) {
  console.log("addMovie() running")
  const placeholder = oldSearch || "eg: Titanic"
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="movie-find-box">
      <form class="movie-find-form" action="#">
        <label for="movietitle">Search movie title</label>
        <input type="text" name="movietitle" id="movietitle" placeholder="${placeholder}" required/>
        <button type="submit">Search</button>
      </form>
    </div>`)
  $('.movie-find-form').submit(function(event) {
    console.log('movie-find-form submitted')
    event.preventDefault()
    const searchTitle = $('#movietitle').val()
    // remove leading and trailing whitespace, convert multiple spaces to single, replace all remaining spaces with '+':
    const formatTitle = searchTitle.trim().replace(/\s\s+/g, ' ').split(' ').join('+');
    searchOMDB(formatTitle)
  })
}

function addGuestMoviesToDb() {
  console.log("addGuestMoviesToDb() ran")
  let totalMovies = previewLibrary.length - 6
  console.log(`Total movies to add = ${totalMovies}`)
  for (let i = previewLibrary.length - 1; i > 5; i--) {
    let movie = previewLibrary[i]
    console.log(`Posting a movie`)
    postMovieToDb(movie, true)
  }
}

function searchOMDB(title) {
// Search OMDB API by Title, returns multiple results:
  console.log("searchOMDB() ran")
  const apiKey = localStorage.getItem('omdbApiKey')
  const fetchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`
    
  fetch(fetchUrl)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
          throw new Error(response.statusText)
      }
    })
    .then(responseJson => {
      if (responseJson.Response === "True") {
      console.log("Movie(s) found")
      console.log(responseJson)
      const results = responseJson.Search
      renderFirstApiResult(results, title)
      } else {
          console.log("No movies found")
          suggestNewSearch(title)
      }
    })
    .catch(err => {
      console.log(`OMDB API failed to fetch: ${err}`)
      suggestNewSearch(title)
    })
  }
    
function lookupOMDB() {
  // Search OMDB API by "IMDB ID", returns one result:
  console.log("lookupOMDB() ran")
}

function renderFirstApiResult(results, searchTitle) {
  console.log("renderFirstApiResult() ran")
  const { Poster, Title, Year, imdbID } = results[0]
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Is this your movie?</h2>
      <p>${Title} -- ${Year}</p>
      <div class="poster-frame"></div>
      <p>
      <button class="yes" id="movie-correct">Yes</button>
      <button class="no" id="movie-incorrect">No</button>
      </p>
    </div>`
  )
  if (Poster !== "N/A") {
    $('.poster-frame').append(
      `<img src="${Poster}" alt="image of ${Title} poster">`
    )
  }
  $('body').one('click', 'button', function(event) {
    event.preventDefault()
    if (`${$(this).prop('id')}` === 'movie-correct') {
      console.log("\"Yes\" button pressed")
      addMovieDetails(results[0])  
    }
    if (`${$(this).prop('id')}` === 'movie-incorrect') {
      console.log("\"No\" button pressed")
      renderMoreApiResults(results, searchTitle)
    }
  })
}

function renderMoreApiResults(results, searchTitle) {
  console.log("renderMoreApiResults() ran")
  console.log(results)
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Sorry about that.</h2>
      <h2>Is it one of these?</h2>
    </div>`
  )
  for (let i = 1; i < results.length; i++) {
    const { Poster, Title, Year, imdbID } = results[i]
    $('.movie-API-box-1').append(
      `<p>${Title} -- ${Year} <button class="yes" id="movie-correct-${i}">Yes</button></p>
      <div class="poster-frame-${i}"></div><br>`
    )
    if (Poster === "N/A") {
      $(`.poster-frame-${i}`).append(
        `<p>This movie poster is not available</p>`
      )
    } else {
      $(`.poster-frame-${i}`).append(
      `<img src="${Poster}" alt="image of ${Title} poster">`
      )
    } 
  }
  $('.movie-API-box-1').append(
    `<button class="no" id="movie-not-here">I don't see my movie listed</button>`
  )
  $('body').one('click', 'button', function(event) {
    for (let i = 1; i < 10; i++) {
      if (`${$(this).prop('id')}` === `movie-correct-${i}`) {
        console.log(`#${i} movie is correct`)
        // update movieData with correct API ID and title 
        addMovieDetails(results[i])
      }
    }
      if (`${$(this).prop('id')}` === 'movie-not-here') {
        console.log("No movies are correct")
        suggestNewSearch(searchTitle)
      }
  })
}
    
function addMovieDetails(omdbMovie) {
  console.log("addMovieDetails() ran")
  console.log(omdbMovie)
  const { Poster, Title, Year, imdbID } = omdbMovie
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Add your details</h2>
      <p>${Title} -- ${Year}</p>
      <div class="poster-frame"></div>
    </div>
    <div class="movie-details-box">
      <form class="movie-submit-form" action="#"><br>
        <label for="rating">What did you think of it?</label><br>
          <input type="radio" name="rating" value="thumbsUp" checked required> Thumbs up<br>
          <input type="radio" name="rating" value="thumbsDown"> Thumbs down<br>
          <input type="radio" name="rating" value="complicated"> It's complicated<br><br>
        <label for="ownCopy">Do you own a copy?</label><br>
          <input type="radio" name="ownCopy" value="true" checked required> Yes<br>
          <input type="radio" name="ownCopy" value="false"> No<br><br>
        <label for="format">Which format(s)? (Leave blank if none)</label><br>
          <input type="checkbox" name="format" value="vhs" id="format-vhs"> VHS<br>
          <input type="checkbox" name="format" value="laserDisc" id="format-laserdisc"> LaserDisc<br>
          <input type="checkbox" name="format" value="dvd" id="format-dvd"> DVD<br>
          <input type="checkbox" name="format" value="bluRay" id="format-bluray"> Blu-ray<br>
          <input type="checkbox" name="format" value="digitalCopy" id="format-digitalcopy"> Digital Copy<br><br>
        <label for="viewingNotes">Viewing Notes</label><br>
          <textarea name="viewingNotes" id="viewingNotes" rows="10" cols="72" maxlength="10000" placeholder="Type any notes you'd like, up to 10,000 characters. Enjoy re-vueing your favorite moments."></textarea>
        <br><br>
        <button type="submit">Submit</button>
      </form>
    </div>`
  )
  if (Poster !== "N/A") {
    $('.poster-frame').append(
      `<img src="${Poster}" alt="image of ${Title} poster">`
    )
  }
  handleMovieSubmit(omdbMovie)
}

function handleMovieSubmit(omdbMovie) {
  console.log(`handleMovieSubmit(running)`)
  let userMovie = {}
  // Preserves character returns inside "textarea":
  $.valHooks.textarea = {
    get: function( elem ) {
      return elem.value.replace( /\r?\n/g, "\r\n" );
    }
  };
  $('.movie-submit-form').submit(function(event) {
    console.log('movie-submit-form submitted')
    event.preventDefault()
    userMovie.title = omdbMovie.Title
    userMovie.imdbId = omdbMovie.imdbID
    userMovie.viewed = $('#viewed').val()
    userMovie.rating = $('input[type=radio][name=rating]:checked').val()
    $('input[type=radio][name=ownCopy]:checked').val(function() { 
      // write boolean to .ownCopy instead of string:
      if (this.value === "true") {
        userMovie.ownCopy = true
      } else {
        userMovie.ownCopy = false
      }
    })
    userMovie.format = $('input[type=checkbox][name=format]:checked').val()
    userMovie.viewingNotes = $('#viewingNotes').val()
    console.log(userMovie)
    postMovieToDb(userMovie)
  })
}

function postMovieToDb(newMovie, silent) {
  console.log(`postMovieToDb() ran`)
  // Do not allow "Guest" to post to db. Add to client previewLibrary instead:
  if (userName === "Guest") {
    console.log("Guest attempting to post movie")
    previewLibrary.push(newMovie)
    console.log(previewLibrary)
    renderSuccessMessage(newMovie.title, true)
  } else {
  // Authorized users may post to db:  
  const userToken = localStorage.getItem('auth')
  fetch('/api/movies/', {
    method: 'POST',
    body: JSON.stringify(newMovie),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    }
  })
    .then(res => {
      if (res.ok) {
        console.log("response OK")
        return res.json()
      } else {
        throw new Error(res.statusText)
      }
    })
    .then(responseJson => {
      console.log("New movie created successfully")
      console.log(responseJson)
      if (silent !== true) {
        renderSuccessMessage(responseJson.title)
      }
      
    })
    .catch(err => {
      console.log(err)
    })
  }
}

function renderSuccessMessage(movieTitle, guest) {
  console.log("renderSuccessMessage() ran")
  if (guest === true) {
  // Display customized message and buttons for "Guest" account:
    $('.video-screen').html(
      `<div class="success-message">
      <h2>${movieTitle}</h2> 
      <p>has been added to your virtual library.</p>
      <p>If you'd like to save this movie permanently, please sign-up for an account.</p>`
    )
    $('.dynamic-buttons').html(
      `<button class="film" id="film-1">View your movie</button>
      <button class="film" id="film-2">Add another one</button>
      <button class="ticket" id="sign-up">Sign-up</button>`
    )
    $('.dynamic-buttons').one('click', 'button', function(event) {
      if (`${$(this).prop('id')}` === 'film-1') {
        console.log('"View your movie" button clicked')
        viewLibraryDetail(movieTitle) // in view-library.js
      }
      if (`${$(this).prop('id')}` === 'film-2') {
        console.log('"Add another one" button clicked')
        addMovie()
      }
    })
  } else {
  // Render success message for registered users:
    $('.video-screen').html(
      `<div class="success-message">
        <h2>${movieTitle}</h2> 
        <p>has been added to your library.</p>`
    )
    $('.dynamic-buttons').html(
        `<button class="film" id="film-1">View your movie</button>
        <button class="film" id="film-2">Add another one</button>`
    )
    $('.dynamic-buttons').one('click', 'button', function(event) {
      if (`${$(this).prop('id')}` === 'film-1') {
        console.log('"View your movie" button clicked')
        viewLibraryDetail(movieTitle) // in view-library.js
      }
      if (`${$(this).prop('id')}` === 'film-2') {
        console.log('"Add another one" button clicked')
        addMovie()
      }
    })
  }
}

function suggestNewSearch(oldSearch) {
  console.log("suggestNewSearch() ran")
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<p>We couldn't find any movies with that title.</p>`
  )
  $('.dynamic-buttons').html(
    `<p>Please <button class="film" id="film-2">Add a movie</button> to try again.</p>`
  )
  $('.dynamic-buttons').one('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'film-2') {
      console.log('"Add a movie" button clicked')
      addMovie(oldSearch)
    }
  })
}
