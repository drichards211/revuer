'use strict'

function addMovie() {
  console.log("addMovie() running")
  $('.video-screen').html(
    `<div class="movie-find-box">
      <form class="movie-find-form" action="#">
        <label for="movietitle">Search movie title</label>
        <input type="text" name="movietitle" id="movietitle" placeholder="eg: Titanic" required/>
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
      renderFirstApiResult(results)
      } else {
          console.log("No movies found")
          suggestNewSearch()
      }
    })
    .catch(err => {
      console.log(`OMDB API failed to fetch: ${err}`)
      suggestNewSearch()
    })
  }
    
function lookupOMDB() {
  // Search OMDB API by "IMDB ID", returns one result:
  console.log("retrieveOMDB() ran")
}

function renderFirstApiResult(results) {
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
      renderMoreApiResults(results)
    }
  })
  
}

function renderMoreApiResults(results) {
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
      `<p>${Title} -- ${Year}</p>
      <div class="poster-frame-${i}"></div>
      <p>
      <button class="yes" id="movie-correct-${i}">Yes</button>
      </p>`
    )
    if (Poster !== "N/A") {
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
        suggestNewSearch()
      }
  })
}
    
function addMovieDetails(movie) {
  console.log("addMovieDetails() ran")
  console.log(movie)
  // update DOM with details form
  // jQuery listen for submit
  // fetch call (possibly a different function)
  // Movie.create({userName: "44sdhjhba", name: 'Star wars', })
}

function suggestNewSearch() {
  console.log("suggestNewSearch() ran")
}