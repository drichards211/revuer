'use strict'

function addMovie() {
  console.log("addMovie() running")
  $('.video-screen').html(
    `<div class="movie-find-box">
      <form class="movie-find-form" action="#">
        <input type="text" name="movietitle" id="movietitle" placeholder="Movie Title" required/>
        <button type="submit">Search</button>
      </form>
    </div>`)
  $('.movie-find-form').submit(function(event) {
    console.log('movie-find-form submitted')
    event.preventDefault()
    const movieTitle = $('#movietitle').val()
    // fetch request to API
    apiResults()
  })
}

function apiResults() {
  console.log("renderAPIResults ran")
  const movieData = "temporary"
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Is this your movie?</h2>
      <button class="yes" id="movie-correct">Yes</button>
      <button class="no" id="movie-incorrect">No</button>
    </div>`)
  $('body').on('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'movie-correct') {
      console.log("\"Yes\" button pressed")
      addMovieDetails(movieData)  
    }
    if (`${$(this).prop('id')}` === 'movie-incorrect') {
      console.log("\"No\" button pressed")
      moreApiResults()
    }
  })
}

function moreApiResults() {
  console.log("moreApiResults() ran")
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Sorry about that.</h2>
      <h2>Is it one of these?</h2>
      <button class="yes" id="movie-correct-1">Yes</button>
      <button class="yes" id="movie-correct-2">Yes</button>
      <button class="yes" id="movie-correct-3">Yes</button>
      <button class="yes" id="movie-correct-4">Yes</button>
      <button class="yes" id="movie-correct-5">Yes</button>
      <button class="yes" id="movie-correct-6">Yes</button>
      <button class="yes" id="movie-correct-7">Yes</button>
      <button class="yes" id="movie-correct-8">Yes</button>
      <button class="yes" id="movie-correct-9">Yes</button>
      <button class="yes" id="movie-correct-10">Yes</button>
      <button class="no" id="movie-not-here">I don't see my movie listed</button>
    </div>`)
    const movieData = "temporary"
    $('body').on('click', 'button', function(event) {
      if (`${$(this).prop('id')}` === 'movie-correct-1') {
        console.log("First movie is correct")
        addMovieDetails(movieData)
      }
      if (`${$(this).prop('id')}` === 'movie-correct-2') {
        console.log("Second movie is correct")
        addMovieDetails(movieData)
      }
      if (`${$(this).prop('id')}` === 'movie-correct-3') {
        console.log("Third movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-4') {
        console.log("Fourth movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-5') {
        console.log("Fifth movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-6') {
        console.log("Sixth movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-7') {
        console.log("Seventh movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-8') {
        console.log("Eighth movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-9') {
        console.log("Ninth movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-correct-10') {
        console.log("Tenth movie is correct")
        addMovieDetails(movieData)
      }  
      if (`${$(this).prop('id')}` === 'movie-not-here') {
        console.log("No movies are correct")
        suggestNewSearch()
      }  
    })
}

function addMovieDetails(movieData) {
  console.log("addMovieDetails() ran")
  // update DOM with details form
  // jQuery listen for submit
  // fetch call (possibly a different function)
  // Movie.create({userName: "44sdhjhba", name: 'Star wars', })


}

function suggestNewSearch() {
  console.log("suggestNewSearch() ran")
}