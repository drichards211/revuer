'use strict'

function addMovie(oldSearch) {
// Render a search form so the user can add a movie:
  console.log("addMovie() running")
  const placeholder = oldSearch || "eg: Titanic"
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="movie-find-box">
      <h2>Add a movie</h2>
      <form class="movie-find-form" action="#">
        <label for="movietitle">Title:</label>
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
// Identify any movies created by a guest; add them to the DB when they register:
  console.log("addGuestMoviesToDb() ran")
  console.log(`Total movies to add = ${previewLibrary.length - 6}`)
  for (let i = previewLibrary.length - 1; i > 5; i--) {
    let movie = previewLibrary[i]
    console.log(`Posting the movie: ${movie.title}`)
    postMovieToDb(movie, true)
  }
}

function searchOMDB(title) {
// Search OMDB API by Title, returns multiple results:
  console.log("searchOMDB() ran")
  const apiKey = localStorage.getItem('omdbApiKey')
  const fetchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`
    
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
    
function lookupOMDB(movieId) {
// Search OMDB API by "IMDB ID", return one result:
  console.log("lookupOMDB() ran")
  return new Promise(resolve => {
    const apiKey = localStorage.getItem('omdbApiKey')
    const fetchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${movieId}`
  
    fetch(fetchUrl)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
            throw new Error(response.statusText)
        }
      })
      .then(responseJson => {
        console.log("Movie found")
        console.log(responseJson)
        resolve(responseJson)
      })
      .catch(err => {
        console.log(`OMDB API failed to fetch: ${err}`)
      })
  })
}

function renderFirstApiResult(results, searchTitle) {
// Display first OMDB search result to the user:
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
// Display 10 more OMDB results to the user: 
  console.log("renderMoreApiResults() ran")
  console.log(results)
  $('.video-screen').html(
    `<div class="movie-API-box-1">
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
// Render a form for submitting movie details: 
  console.log("addMovieDetails() ran")
  console.log(omdbMovie)
  const { Poster, Title, Year, imdbID } = omdbMovie
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Add your details</h2>
      <p>${Title} -- ${Year}</p>
      <div class="poster-frame"></div>
    </div>
    <div class="movie-details-box">
      <form class="movie-submit-form" action="#"><br>
        <label for="rating">What did you think of it?</label><br>
          <input type="radio" name="rating" value="lovedIt" checked required> Loved it<br>
          <input type="radio" name="rating" value="likedIt"> Liked it<br>
          <input type="radio" name="rating" value="complicated"> It's complicated<br>
          <input type="radio" name="rating" value="dislikedIt"> Disliked it<br>
          <input type="radio" name="rating" value="hatedIt"> Hated it<br><br>
        <label for="ownCopy">Do you own a copy?</label><br>
          <input type="radio" name="ownCopy" value="true" checked required> Yes<br>
          <input type="radio" name="ownCopy" value="false"> No<br><br>
        <label for="format">Which format(s)? (Leave blank if none)</label><br>
          <input type="checkbox" name="format" value="VHS" id="format-vhs"> VHS<br>
          <input type="checkbox" name="format" value="LaserDisc" id="format-laserdisc"> LaserDisc<br>
          <input type="checkbox" name="format" value="DVD" id="format-dvd"> DVD<br>
          <input type="checkbox" name="format" value="Blu-ray" id="format-bluray"> Blu-ray<br>
          <input type="checkbox" name="format" value="Digital Copy" id="format-digitalcopy"> Digital Copy<br><br>
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
// Create a userMovie object from submitted form data:
  console.log(`handleMovieSubmit(running)`)
  let userMovie = {}
  // Preserves character returns inside "textarea" field:
  $.valHooks.textarea = {
    get: function( elem ) {
      return elem.value.replace( /\r?\n/g, "\r\n" );
    }
  };
  $('.movie-submit-form').submit(function(event) {
    console.log('"Submit" button pressed')
    event.preventDefault()
    userMovie.title = omdbMovie.Title
    userMovie.imdbId = omdbMovie.imdbID
    userMovie.viewed = $('#viewed').val()
    userMovie.rating = $('input[type=radio][name=rating]:checked').val()
    $('input[type=radio][name=ownCopy]:checked').val(function() { 
      // write boolean to .ownCopy instead of string:
      userMovie.ownCopy = this.value === "true" ? true : false
    })
    // Propagate array from multiple checkboxes:
    userMovie.format = $('input[type=checkbox][name=format]:checked').map(function(_, el) {
      return $(el).val();
    }).get();
    userMovie.viewingNotes = $('#viewingNotes').val()
    console.log(userMovie)
    postMovieToDb(userMovie)
  })
}

function postMovieToDb(newMovie, silent) {
// Post newMovie object to DB:
  console.log(`postMovieToDb() ran`)
  if (userName === "Guest") {
  // Do not allow "Guest" to post to db. Add to client previewLibrary instead:
    console.log("Guest attempting to post movie")
    previewLibrary.push(newMovie)
    console.log(previewLibrary)
    renderSuccessMessage(newMovie, true)
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
      if (silent === false) {
        renderSuccessMessage(newMovie)
      }
      
    })
    .catch(err => {
      console.log(err)
    })
  }
}

async function renderSuccessMessage(newMovie, guest) {
// Display message to user when movie successfully created:  
  console.log("renderSuccessMessage() ran")
  const { imdbId, title } = newMovie
  await updateLibraryResults()
    const index = libraryResults.length
    if (guest) {
    // Display customized message and buttons for "Guest" account:
      $('.video-screen').html(
        `<div class="success-message">
        <h2>${title}</h2> 
        <p>has been added to your virtual library.</p>
        <p>If you'd like to save this movie permanently, please sign-up for an account.</p>`
      )
      $('.dynamic-buttons').html(
        `<button class="film" id="film-1">View your movie</button>
        <button class="film" id="film-2">Add another one</button>
        <button class="ticket" id="sign-up">Sign-up</button>`
      )
      $('body').one('click', 'button', function(event) {
        if (`${$(this).prop('id')}` === 'film-1') {
          console.log('"View your movie" button clicked')
          viewLibraryDetail(imdbId, index - 1) // in view-library.js
        }
      })
  } else {
  // Render success message for registered user:
    $('.video-screen').html(
      `<div class="success-message">
        <h2>${title}</h2> 
        <p>has been added to your library.</p>`
    )
    $('.dynamic-buttons').html(
        `<button class="film" id="film-1">View your movie</button>
        <button class="film" id="film-2">Add another one</button>`
    )
    $('.dynamic-buttons').one('click', 'button', function(event) {
      if (`${$(this).prop('id')}` === 'film-1') {
        console.log('"View your movie" button clicked')
        if (index === 0) {
          viewLibraryDetail(imdbId, 0) // in view-library.js
        } else {
          viewLibraryDetail(imdbId, index - 1) // in view-library.js
        }
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
