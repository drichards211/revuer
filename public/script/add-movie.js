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
  let results
  const apiKey = localStorage.getItem('omdbApiKey')
  const fetchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`
  console.log(fetchUrl)
  
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`)
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
      results = responseJson.Search
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
  /* const firstResult = results[0] */
  const { Poster, Title, Year, imdbID } = results[0]
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Is this your movie?</h2>
      <p>${Title} -- ${Year}</p>
      <img src="${Poster}" alt="image of ${Title} poster">
      <p>
      <button class="yes" id="movie-correct">Yes</button>
      <button class="no" id="movie-incorrect">No</button>
      </p>
    </div>`)
  $('body').on('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'movie-correct') {
      console.log("\"Yes\" button pressed")
      addMovieDetails(results[0])  
    }
    if (`${$(this).prop('id')}` === 'movie-incorrect') {
      console.log("\"No\" button pressed")
      renderMoreApiResults()
    }
  })
}

function renderMoreApiResults() {
  console.log("renderMoreApiResults() ran")
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Sorry about that.</h2>
      <h2>Is it one of these?</h2>
      <button class="yes" id="movie-correct-0">Yes</button>
      <button class="yes" id="movie-correct-1">Yes</button>
      <button class="yes" id="movie-correct-2">Yes</button>
      <button class="yes" id="movie-correct-3">Yes</button>
      <button class="yes" id="movie-correct-4">Yes</button>
      <button class="yes" id="movie-correct-5">Yes</button>
      <button class="yes" id="movie-correct-6">Yes</button>
      <button class="yes" id="movie-correct-7">Yes</button>
      <button class="yes" id="movie-correct-8">Yes</button>
      <button class="yes" id="movie-correct-9">Yes</button>
      <button class="no" id="movie-not-here">I don't see my movie listed</button>
    </div>`)
    const movieData = "temporary"
    $('body').on('click', 'button', function(event) {
      for (let i = 0; i < 10; i++) {
        if (`${$(this).prop('id')}` === `movie-correct-${i}`) {
          console.log(`#${i} movie is correct`)
          // update movieData with correct API ID and title 
          addMovieDetails(movieData)
        }
      }
      if (`${$(this).prop('id')}` === 'movie-not-here') {
        console.log("No movies are correct")
        suggestNewSearch()
      }  
    })
  }
    
function addMovieDetails(movieData) {
  console.log("addMovieDetails() ran")
  console.log(movieData)
  // update DOM with details form
  // jQuery listen for submit
  // fetch call (possibly a different function)
  // Movie.create({userName: "44sdhjhba", name: 'Star wars', })
}

function suggestNewSearch() {
  console.log("suggestNewSearch() ran")
}