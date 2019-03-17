'use strict'

function viewLibrary() {
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
    
  } else {
    // Display Sample Library for "guest":
    for (let i = 0; i < previewLibrary.length; i++) {
      const rating = eval(`${previewLibrary[i].rating}`)
      $('.movie-list').append(
        `<button id="movie-detail-${i}">
          ${previewLibrary[i].title} ${rating}
        </button>`
      )
    }
  }
}

function viewLibraryDetail(movieTitle) {
  console.log("viewLibraryDetail() ran")
  console.log(`movieTitle = ${movieTitle}`)
  $('.dynamic-buttons').empty()
}





// Movie.find({userName: "7aausvdgvjhads"}).populate({path: 'userName'})