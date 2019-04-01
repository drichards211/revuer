'use strict'
let libraryResults
let libraryPrefs = {
  currentPage: 0,
  currentDetailPage: 0,
  resultsPerPage: 10,
  sortType: "created",
  sortDirection: "ascending"
}

async function viewLibrary(a, b, c) {
  console.log("viewLibrary() ran")
  const lovedIt = "<3", likedIt = "^", complicated = ":/", dislikedIt = "v", hatedIt = ":(" // update these to contain html displaying appropriate image fonts
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<h2>Library</h2>
    <div class="movie-list">
    </div>`
  )
  await updateLibraryResults()
  // Display user library results:
  if (libraryResults.length > 0) {
    for (let i = 0; i < libraryResults.length; i++)
    $('.movie-list').append(
      `<button id="movie-detail-${i}">
          ${libraryResults[i].title} ${eval(libraryResults[i].rating)}
      </button><br>`
    )
  } else {
    // If library is empty: 
    $('.movie-list').append(
      `<p>There are no movies yet.</p>`
    )
    $('.dynamic-buttons').html(
      `<p><button class="film" id="film-2">Add a movie</button> to your library.</p>`
    )
  }
}

async function viewLibraryDetail(imdbId, index) {
  console.log("viewLibraryDetail() ran")
  // Retrieve detailed movie information from the OMDB:
  let omdbMovie = await lookupOMDB(imdbId) // in add-movie.js
    console.log("await lookupOMDB() promise returned")
    const { Actors, Awards, Director, Genre, Plot, Production, Poster, Runtime, Title, Year } = omdbMovie
  
  await updateLibraryResults()
    const { rating, ownCopy, format, viewingNotes } = libraryResults[index]
    const lovedIt = "Loved it", likedIt = "Liked it", complicated = "It's complicated", dislikedIt = "Disliked it", hatedIt = "Hated it" // update these to contain html displaying appropriate image fonts
    const renderFormats = function() { 
    // Convert the contents of the "format" array into a nicely rendered string:
      if (format.length === 0) {
        return `None`
      } else {
        let rendered = ``
        for (let i = 0; i < format.length; i++) {
          if (i < format.length - 1) {
          rendered += (format[i] + `, `)
          } else {
            rendered += (format[i])
          }
        }     
        return rendered
      }
    }
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <p>${Title} -- ${Year}</p>
      <div class="poster-frame"></div>
      <p>Rating: ${eval(rating)}</p>
      <p>${viewingNotes}</p>
      <p>Formats owned: ${renderFormats()}</p>
    </div>`
  )
  if (Poster !== "N/A") {
    $('.poster-frame').append(
      `<img src="${Poster}" alt="image of ${Title} poster">`
    )
  }
  $('.dynamic-buttons').html(
    `<p><button class="film" id="film-3">Edit this movie</button></p>
    <p><button class="film" id="film-4">Return to Library</button></p>`
  )
  $('.dynamic-buttons').one('click', 'button', function(event) {
      if (`${$(this).prop('id')}` === 'film-3') {
        console.log('"Edit this movie" button pressed')
        editMovie(omdbMovie, index) // in edit-movie.js
      }
  })
}

async function updateLibraryResults() {
  // Update local libraryResults variable with values from DB:
  console.log(`updateLibraryResults() ran`)
  if (userName === "Guest") {
    // Propagate "Guest" library with temporary values:
    libraryResults = previewLibrary
  } else {
    // Retrieve user's library from DB:
    libraryResults = await getMovies()
      console.log("await getMovies() promise returned")
      console.log(libraryResults)
  }
}

function getSandwich() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is a sandwich');
    }, 2000);
  });
}

function getMovies() {
  console.log("getMovies() ran")
  return new Promise(resolve => {
    const userToken = localStorage.getItem('auth')
      fetch('/api/movies', {
        method: 'GET',
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
          throw new Error(res)
        }
      })
      .then(responseJson => {
        console.log(responseJson)
        resolve(responseJson)
      })
      .catch(err => {
        console.log(err)
        $('.movie-list').append(
          `<p>We're having trouble connecting to the database. Please try again later.</p>`
        )
      })
  })
    
}



// Movie.find({userName: "7aausvdgvjhads"}).populate({path: 'userName'})