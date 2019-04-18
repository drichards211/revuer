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
// Display user's library:
  console.log("viewLibrary() ran")
  const lovedIt = `<i class="fas fa-heart"></i>`, likedIt = `<i class="far fa-thumbs-up"></i>`, complicated = `<i class="far fa-meh"></i>`, dislikedIt = `<i class="far fa-thumbs-down"></i>`, hatedIt = `<i class="fas fa-skull-crossbones"></i>`
  emptyTheContainers() // in index.js
  /* $('.dynamic-buttons').empty()
  $('.video-screen').empty() */
  $('.movie-marquee').append(
    `<h2>Library</h2>
      <div class="movie-list"></div>`
  )
  await updateLibraryResults()
  // Iterate through array and display each result:
  if (libraryResults.length > 0) {
    for (let i = 0; i < libraryResults.length; i++) {
      $('.movie-list').append(
        `<button id="movie-detail-${i}" class="movie-button">
        <span class="rating-icon">${eval(libraryResults[i].rating)}&nbsp</span><span class="movie-title">${libraryResults[i].title.toUpperCase()}</span>
        </button><br>`
      )
      /* ▬ ${libraryResults[i].year} */
      $('body').one('click', 'button', function(event) {
        if (`${$(this).prop('id')}` === `movie-detail-${i}`) {
          console.log(`"movie-detail-${i}" button pressed`)
          viewLibraryDetail(libraryResults[i].imdbId, i)
        } 
      })
    }
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
// Display a single movie in detail:
  console.log("viewLibraryDetail() ran")
  // Retrieve detailed movie information from the OMDB:
  let omdbMovie = await lookupOMDB(imdbId) // in add-movie.js
    console.log("await lookupOMDB() promise returned")
    const { Actors, Awards, BoxOffice, Director, Genre, Plot, Production, Poster, Released, Runtime, Title, Year } = omdbMovie
  // Retrieve user's movie detail from the db:
  await updateLibraryResults()
    const { rating, ownCopy, format, viewingNotes } = libraryResults[index]
    const lovedIt = "Loved it", likedIt = "Liked it", complicated = "It's complicated", dislikedIt = "Disliked it", hatedIt = "Hated it" // update these to contain html displaying appropriate image fonts
    const renderFormats = function() { 
    // Convert the contents of the "format" array into a user-friendly string:
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
    const formatDate = function() {
    // Format the 'Released' date string into something more verbose:
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      const months = {
        "Jan": [0, "January"],
        "Feb": [1, "February"],
        "Mar": [2, "March"],
        "Apr": [3, "April"],
        "May": [4, "May"],
        "Jun": [5, "June"],
        "Jul": [6, "July"],
        "Aug": [7, "August"],
        "Sep": [8, "September"],
        "Oct": [9, "October"],
        "Nov": [10, "November"],
        "Dec": [11, "December"],
      }
      const year = Released.slice(-4)
      const shortMonth = Released.slice(3,6)
      const fullMonth = months[shortMonth][1]
      const day = Released.slice(0,2)
      const date = new Date(year, months[shortMonth][0], day)
      const weekday = weekdays[date.getDay()]
      return `${weekday} ${fullMonth} ${day}, ${year}`
    }
  /* $('.dynamic-buttons').empty() */
  emptyTheContainers() // in index.js
  $('.movie-marquee').html(
    `<div class ="newspaper">
      <div class="head">
        <div class="headerobjectswrapper">
          <header>The Revuer</header>
        </div>
        <div class="subhead">${formatDate()}</div>
      </div>
      <div class="content">
        <div class="collumns">
          <div class="collumn">
            <figure class="figure">
              <img class="media" src="${Poster}" alt="">
              <figcaption class="figcaption">${Title} movie poster.</figcaption>
            </figure>    
            <div class="head">
              <span class="headline hl5">${Title}</span>
              <p><span class="headline hl4">Movie revue by ${userName}</span></p>
            </div>
            <p>${viewingNotes}</p>
            <p><div class="info-box">Rating: &nbsp${eval(rating)}<br>
              Formats owned: &nbsp${renderFormats()}
              </div>
            </p>
          </div>
          <div class="collumn">
            <div class="head"><span class="headline hl3">Plot Summary</span>
              <p><span class="headline hl6">OMDB Contributor</span></p>
            </div>
            <p>${Plot}</p>
            <p>${Production}, &nbsp${Year}<br>Runtime: &nbsp${Runtime}</p><br>
            <div class="head"><span class="headline hl1">All-Star Cast</span>
              <p><span class="headline hl2">Directed by: ${Director}</span></p>
            </div>
            <p>${Actors}</p>
            <p>${Awards}</p>
            <p>Box Office: &nbsp${BoxOffice}</p>
          </div>
        </div>
      </div>
    </div>`
    
    
    
    
    
    
    
    
    
    
    
    
  )
  /* <div class="newspaper">
      <p>${Title} -- ${Year}</p>
      <div class="poster-frame"></div>
      <p>Rating: ${eval(rating)}</p>
      <p>${viewingNotes}</p>
      <p>Formats owned: ${renderFormats()}</p>
    </div>` */
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
// Irreverent testing function which returns a promise:  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('This is a sandwich');
    }, 2000);
  });
}

function getMovies() {
// Retrieve all of the user's movies from the db: 
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