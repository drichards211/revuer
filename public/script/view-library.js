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
    const { Actors, Awards, Director, Genre, Plot, Production, Poster, Runtime, Title, Year } = omdbMovie
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
  /* $('.dynamic-buttons').empty() */
  emptyTheContainers() // in index.js
  $('.movie-marquee').html(
    `<div class ="newspaper">
    <div class="head">
    <div class="headerobjectswrapper">
      <header>The Revuer</header>
    </div>

    <div class="subhead">Current Town, State - Current Date</div>
</div>
<div class="content">
    <div class="collumns">
        <div class="collumn">
        <figure class="figure">
								<img class="media" src="${Poster}" alt="">
								<figcaption class="figcaption">Placeholder image text.</figcaption>
				</figure>    
        <div class="head"><span class="headline hl5">${Title}</span><p><span class="headline hl4">by ${userName}</span></p></div>
            ${viewingNotes}</p></div>
        <div class="collumn">
            <div class="head"><span class="headline hl3">IMDB Plot Summary</span><p><span class="headline hl6">Clickable link to IMDB?</span></p></div>
            ${Plot}</p>
           </div>
        <div class="collumn"><div class="head"><span class="headline hl1">May the Force be with you</span><p><span class="headline hl2">Let go your conscious self and act on instinct</span></p></div>Partially, but it also obeys your commands. Hey, Luke! May the Force be with you. I have traced the Rebel spies to her. Now she is my only link to finding their secret base.</p>
	<figure class="figure">
								<img class="media" src="http://i.giphy.com/4fDWVPMoSyhgc.gif" alt="">
								<figcaption class="figcaption">"This time, let go your conscious self and act on instinct."</figcaption>
						</figure>
            <p>Leave that to me. Send a distress signal, and inform the Senate that all on board were killed. <span class="citation">"Don't under&shy;estimate the Force. I suggest you try it again, Luke."</span> This time, let go your conscious self and act on instinct. In my experience, there is no such thing as luck. You're all clear, kid. Let's blow this thing and go home!</p>
            <p>You don't believe in the Force, do you? Partially, but it also obeys your commands. The plans you refer to will soon be back in our hands. As you wish.</p></div>
        <div class="collumn"><div class="head"><span class="headline hl3">The buzz of the little world </span><p><span class="headline hl4">A thousand unknown plants</span></p></div><p>I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the meridian sun strikes the upper surface of the impenetrable foliage of my trees, and but a few stray gleams steal into the inner sanctuary, I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies, then I feel the presence of the Almighty, who formed us in his own image, and the breath</p></div>
        <div class="collumn"><div class="head"><span class="headline hl1">It wasn't a dream </span><p><span class="headline hl4">by FRANZ KAFKA</span></p></div><p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. </p>
					
					<p>His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. </p></div>
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