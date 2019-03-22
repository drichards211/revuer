'use strict'

async function viewLibrary() {
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
    let libraryResults = await getMovies()/* .catch((err) => { console.log(err) }) */
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

function viewLibraryDetail(movieTitle) {
  console.log("viewLibraryDetail() ran")
  console.log(`movieTitle = ${movieTitle}`)
  $('.dynamic-buttons').empty()
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