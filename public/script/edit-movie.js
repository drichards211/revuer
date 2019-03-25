'use strict'

function editMovie(omdbMovie, index) {
  console.log("editMovie() ran")
  console.log(`index = ${index}`)
  const { Poster, Title, Year, imdbID } = omdbMovie
  const { rating, ownCopy, format, viewingNotes } = libraryResults[index]
  
  // Propagate form with pre-existing values:
  const checkRating = radioValue => {
    return rating === radioValue ? "checked" : ""
  }
  const checkOwnCopy = radioValue => {
    return ownCopy === radioValue ? "checked" : ""
  }
  const checkFormat = checkboxValue => { 
    return format.includes(checkboxValue) === true ? "checked" : "" 
  }
  
  $('.dynamic-buttons').empty()
  $('.video-screen').html(
    `<div class="movie-API-box-1">
      <h2>Edit this movie</h2>
      <p>${Title} -- ${Year}</p>
      <div class="poster-frame"></div>
    </div>
    <div class="movie-details-box">
      <form class="movie-submit-form" action="#"><br>
        <label for="rating">What did you think of it?</label><br>
          <input type="radio" name="rating" value="thumbsUp" ${checkRating("thumbsUp")} required> Thumbs up<br>
          <input type="radio" name="rating" value="thumbsDown" ${checkRating("thumbsDown")}> Thumbs down<br>
          <input type="radio" name="rating" value="complicated" ${checkRating("complicated")}> It's complicated<br><br>
        <label for="ownCopy">Do you own a copy?</label><br>
          <input type="radio" name="ownCopy" value="true" ${checkOwnCopy(true)} required> Yes<br>
          <input type="radio" name="ownCopy" value="false" ${checkOwnCopy(false)}> No<br><br>
        <label for="format">Which format(s)? (Leave blank if none)</label><br>
          <input type="checkbox" name="format" value="VHS" id="format-vhs" ${checkFormat("VHS")}> VHS<br>
          <input type="checkbox" name="format" value="LaserDisc" id="format-laserdisc" ${checkFormat("LaserDisc")}> LaserDisc<br>
          <input type="checkbox" name="format" value="DVD" id="format-dvd" ${checkFormat("DVD")}> DVD<br>
          <input type="checkbox" name="format" value="Blu-ray" id="format-bluray" ${checkFormat("Blu-ray")}> Blu-ray<br>
          <input type="checkbox" name="format" value="Digital Copy" id="format-digitalcopy" ${checkFormat("Digital Copy")}> Digital Copy<br><br>
        <label for="viewingNotes">Viewing Notes</label><br>
          <textarea name="viewingNotes" id="viewingNotes" rows="10" cols="72" maxlength="10000" placeholder="Type any notes you'd like, up to 10,000 characters. Enjoy re-vueing your favorite moments.">${viewingNotes}</textarea>
        <br><br>
        <button type="submit">Update</button>
      </form>
    </div>`
  )
  if (Poster !== "N/A") {
    $('.poster-frame').append(
      `<img src="${Poster}" alt="image of ${Title} poster">`
    )
  }
  $('.dynamic-buttons').html(
    `<p><button class="film" id="film-5">Cancel</button></p>`
  )
  $('body').on('click', 'button', function(event) {
    if (`${$(this).prop('id')}` === 'film-5') {
      console.log('"Cancel" button pressed')
      viewLibraryDetail(imdbID, index)
    }
  })
  
  handleMovieEdit(omdbMovie)
}

function handleMovieEdit(omdbMovie) {
  console.log(`handleMovieEdit(running)`)
  let userMovie = {}
  // Preserves character returns inside "textarea":
  $.valHooks.textarea = {
    get: function( elem ) {
      return elem.value.replace( /\r?\n/g, "\r\n" );
    }
  };
  $('.movie-submit-form').submit(function(event) {
    console.log('movie-submit-form submitted')
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
    /* updateMovieToDb(userMovie) */
  })
}

function updateMovieToDb(newMovie, silent) {
  console.log(`postMovieToDb() ran`)
  // Do not allow "Guest" to post to db. Add to client previewLibrary instead:
  if (userName === "Guest") {
    console.log("Guest attempting to post movie")
    previewLibrary.push(newMovie)
    console.log(previewLibrary)
    renderSuccessMessage(newMovie.title, true)
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
      if (silent !== true) {
        renderSuccessMessage(responseJson.title)
      }
      
    })
    .catch(err => {
      console.log(err)
    })
  }
}

