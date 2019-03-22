'use strict'
let libraryResults

async function viewLibrary(a, b, c) {
  console.log("viewLibrary() ran")
  const userToken = localStorage.getItem('auth')
  const thumbsUp = "^" // update this to contain html "thumbsUp" IMG
  const thumbsDown = "v" // update this to contain html "thumbsDown" IMG
  const complicated = ":/" // update this to contain html "complicated" IMG
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<h2>Library</h2>
    <div class="movie-list">
    </div>`
  )
  if (userName !== "Guest") {
    // Display user library results:
    libraryResults = await getMovies()/* .catch((err) => { console.log(err) }) */
    console.log("await completed, promise returned")
    console.log(libraryResults)
    if (libraryResults.length > 0) {
      for (let i = 0; i < libraryResults.length; i++)
      $('.movie-list').append(
        `<button id="movie-detail-${i}">
            ${libraryResults[i].title} ${eval(libraryResults[i].rating)}
        </button><br>`
      )
    } else {
      $('.movie-list').append(
        `<p>There are no movies yet.</p>`
      )
      $('.dynamic-buttons').html(
        `<p><button class="film" id="film-2">Add a movie</button> to your library.</p>`
      )
      $('.dynamic-buttons').one('click', 'button', function(event) {
        if (`${$(this).prop('id')}` === 'film-2') {
          console.log('"Add a movie" button clicked')
          addMovie()
        }
      })
    }
  } else {
    // Display Sample Library for "guest":
    for (let i = 0; i < previewLibrary.length; i++) {
      $('.movie-list').append(
        `<button id="movie-detail-${i}">
          ${previewLibrary[i].title} ${eval(previewLibrary[i].rating)}
        </button><br>`
      )
    }
  }
}

async function viewLibraryDetail(imdbId, index) {
  console.log("viewLibraryDetail() ran")
  let omdbMovie = await lookupOMDB(imdbId) // in add-movie.js
  console.log("await completed, promise returned")
  const { Actors, Awards, Director, Genre, Plot, Production, Poster, Runtime, Title, Year } = omdbMovie
  const { rating, ownCopy, format, viewingNotes } = libraryResults[index]
  const thumbsUp = "Thumbs Up", thumbsDown = "Thumbs Down", complicated = "It's Complicated"
  const renderFormats = function() { 
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
    `<p><button class="film" id="film-4">Return to Library</button></p>`
  )
  $('.dynamic-buttons').one('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'film-4') {
      console.log('"Return to Library" button clicked')
      viewLibrary()
    }
  })
  
}

function getSandwich() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is a sandwich');
    }, 2000);
  });
}

function getMovies() {
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