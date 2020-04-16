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
  $('.movie-marquee').append(
    `<div class="movie-list">
      <div class="movie-button-spacer">
        <span class="movie-title">&nbsp;</span>
      </div>
    </div>`
  )
  /* <button class="now-showing-button">
  <span class="now-showing">NOW SHOWING</span>
  </button><br> */

  /*<button class="movie-button-spacer">
        <span class="movie-title">&nbsp;</span>
      </button>
    </div>*/
  await updateLibraryResults()
  // Iterate through array and display each result:
  if (libraryResults.length > 0) {
    for (let i = 0; i < libraryResults.length; i++) {
      $('.movie-list').append(
        `<button id="movie-detail-${i}" class="movie-button">
        <span class="rating-icon">${eval(libraryResults[i].rating)}&nbsp</span><span class="movie-title">${libraryResults[i].title.toUpperCase()}</span>
        </button><br>`
      )
      $('body').one('click', 'button', function(event) {
        if (`${$(this).prop('id')}` === `movie-detail-${i}`) {
          console.log(`"movie-detail-${i}" button pressed`)
          viewLibraryDetail(libraryResults[i].imdbId, i)
        } 
      })
    }
    /* if (libraryResults.length < 10) {
      for (let i = 10 - libraryResults.length; i < 10; i++) {
        $('.movie-list').append(
          `<div class="movie-button-spacer">
            <span class="movie-title">&nbsp;</span>
          </div>`
        )
      }
    } */
    $('.movie-list').append(
      `<div class="movie-button-spacer">
        <span class="movie-title">&nbsp;</span>
      </div>`
    )
  } else {
    // If library is empty: 
    $('.movie-list').append(
      `<p>There are no movies yet.</p>`
    )
    $('.film-button-wrapper').html(
      `<div class="film"></div>  
      <div class="film"></div>  
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <button class="film" id="film-2">Add a movie</button>
      <div class="film"></div>  
      <div class="film"></div>  
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <div class="film"></div>
      <script>$('.film').fitText(1, 'compressor * 5.7');</script>`
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
          <br>
            <figure class="figure">
              <img class="media" src="${Poster}" onerror="$(this).hide()" alt="">
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
            <div class="head"><span class="headline hl5">The Nation</span>
              <p><span class="headline hl6">Hildy Johnson</span></p>
            </div>
            <p>Mollis magna dictum nullam massa netus ipsum eleifend suspendisse porta, pellentesque nascetur ridiculus venenatis ligula per purus. Ex venenatis duis praesent ante inceptos augue taciti arcu ridiculus, curae nisl torquent tempor fermentum tristique faucibus accumsan lorem habitant, quis purus vel tempus scelerisque per phasellus non. In vel morbi pulvinar nec maximus adipiscing curae, sem ridiculus porttitor etiam torquent odio, purus ex consectetur pretium facilisi efficitur. Aenean interdum vehicula laoreet suscipit justo malesuada phasellus porttitor per platea sociosqu tristique nisi, pulvinar ullamcorper luctus consequat accumsan nisl semper aliquet tellus libero eget. Faucibus nam montes venenatis massa pharetra vestibulum nullam, purus tristique class tellus at etiam nec, dis et amet eu dictum ipsum. Est rutrum sem egestas curae nisl a vivamus tristique, ante mi ipsum maximus euismod morbi amet, neque mattis habitasse vitae class per velit. Sed volutpat senectus dictum tellus metus et maximus sociosqu quam, eget cursus integer montes nibh interdum habitant quis mattis, potenti velit nascetur ornare aenean nisl dictumst vestibulum.</p>
          </div>
          <div class="collumn">
            <div class="head"><span class="headline hl1">International News</span>
              <p><span class="headline hl6">Sparky Valentine</span></p>
            </div>
              <p>Maximus pharetra sapien nulla felis eros mattis commodo semper, ipsum penatibus rutrum sed placerat iaculis venenatis, justo mauris aliquet ornare donec dictumst conubia. Magnis accumsan inceptos sagittis facilisis sapien nullam parturient sed, fermentum mattis velit erat congue vestibulum sociosqu. Non metus scelerisque pellentesque taciti urna ridiculus odio, montes ac congue facilisi dictumst platea felis, lacus placerat aenean leo lectus suscipit. Praesent sed ipsum tellus est accumsan potenti nulla taciti, suscipit ante hendrerit nascetur turpis pulvinar viverra. Montes maecenas pellentesque arcu aenean elit consectetur suscipit, praesent venenatis lorem bibendum platea lacinia eleifend risus, pretium per quis fames dolor ac. Vulputate molestie nec porta varius ut urna, aenean est donec curae tincidunt lorem, nam eleifend mollis orci nibh. Platea nisi facilisis sagittis interdum tincidunt venenatis class risus, blandit turpis fusce rhoncus erat lobortis ante, dictum ipsum nam cubilia morbi etiam justo. Parturient id amet imperdiet lacinia egestas turpis congue in dis, rhoncus ante odio efficitur feugiat aliquam augue a lobortis, luctus sagittis tincidunt dolor donec magnis viverra venenatis. Turpis orci pharetra quisque maximus ullamcorper hac, inceptos integer in vehicula habitasse nisi, ante felis quis leo magna. Adipiscing praesent ullamcorper nam sodales conubia congue sit imperdiet sed, blandit mus porttitor tellus arcu purus duis morbi facilisis, cras lectus litora quisque natoque tristique suspendisse aliquam.</p>
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
      `<img src="${Poster}" onerror="$(this).hide()" alt="image of ${Title} poster">`
    )
  }
  $('.film-button-wrapper').html(
    `<div class="film news"></div>  
      <div class="film news"></div>  
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <button class="film news" id="film-4">Return to Library</button>
      <button class="film news" id="film-3">Edit this movie</button>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <div class="film news"></div>
      <script>$('.film').fitText(1, 'compressor * 5.7');</script>`
  )
  /*<script>$('.film').fitText(1, 'compressor * 4.7');</script>*/ 
  /*<script>$('.film').fitText(1, 'compressor * 6', { minFontSize: '10px', maxFontSize: '80px' });</script>*/
  $('.film-button-wrapper').one('click', 'button', function(event) {
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