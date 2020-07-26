"use strict";

function addMovie(oldSearch) {
  // Render a search form so the user can add a movie:
  console.log("addMovie() running");
  const placeholder = oldSearch || "eg: Titanic";
  emptyTheContainers(); // in index.js
  /* $('.dynamic-buttons').empty() */
  $(".movie-marquee").html(
    `<div class="movie-find-box">
      <div class="film-cannister">
        <form class="movie-find-form" action="#">
          <label for="movietitle">Search for movie title:</label>
          <textarea name="movietitle" id="movietitle" placeholder="eg: Titanic" required="" class="film-label" rows="3" cols="15" spellcheck="false"/>
          <script>$('#movietitle').fitText(1, 'compressor * 7.5');</script>
          <button type="submit" id="movietitle-button">Search</button>
          <script>$('#movietitle-button').fitText(1, 'compressor * 3');</script>
        </form>
        <img src="../image/gold-canister-single-label.png" alt="Film Cannister" class="cannister-img">
      </div>
    </div>`
  );

  let submitMovie = () => {
    console.log("submitMovie() ran");
    const searchTitle = $("#movietitle").val();
    // remove leading and trailing whitespace, convert multiple spaces to single, replace all remaining spaces with '+':
    const formatTitle = searchTitle
      .trim()
      .replace(/\s\s+/g, " ")
      .split(" ")
      .join("+");
    searchOMDB(formatTitle);
  };

  // submit form if user presses ENTER key:
  $(".movie-find-form").keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      submitMovie();
    }
  });
  // submit form if user clicks SEARCH button:
  $(".movie-find-form").submit(function (event) {
    event.preventDefault();
    submitMovie();
  });
}

function addGuestMoviesToDb() {
  // Identify any movies created by a guest; add them to the DB when they register:
  console.log("addGuestMoviesToDb() ran");
  console.log(`Total movies to add = ${previewLibrary.length - 8}`);
  for (let i = previewLibrary.length - 1; i > 7; i--) {
    let movie = previewLibrary[i];
    console.log(`Posting the movie: ${movie.title}`);
    postMovieToDb(movie, true);
  }
}

function searchOMDB(title) {
  // Search OMDB API by Title, returns multiple results:
  console.log("searchOMDB() ran");
  const apiKey = localStorage.getItem("omdbApiKey");
  const fetchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&s=${title}`;

  fetch(fetchUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((responseJson) => {
      if (responseJson.Response === "True") {
        console.log("Movie(s) found");
        console.log(responseJson);
        const results = responseJson.Search;
        renderFirstApiResult(results, title);
      } else {
        console.log("No movies found");
        suggestNewSearch(title);
      }
    })
    .catch((err) => {
      console.log(`OMDB API failed to fetch: ${err}`);
      suggestNewSearch(title);
    });
}

function lookupOMDB(movieId) {
  // Search OMDB API by "IMDB ID", return one result:
  console.log("lookupOMDB() ran");
  return new Promise((resolve) => {
    const apiKey = localStorage.getItem("omdbApiKey");
    const fetchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie&i=${movieId}`;

    fetch(fetchUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((responseJson) => {
        console.log("Movie found");
        console.log(responseJson);
        resolve(responseJson);
      })
      .catch((err) => {
        console.log(`OMDB API failed to fetch: ${err}`);
      });
  });
}

function renderFirstApiResult(results, searchTitle) {
  // Display first OMDB search result to the user:
  console.log("renderFirstApiResult() ran");
  emptyTheContainers(); // in index.js
  const { Poster, Title, Year, imdbID } = results[0];
  $(".movie-marquee").html(
    `<div class="movie-API-box-1">
      <h2>Is this your movie?</h2>
      <div class="poster-frame"></div>
      <p class="movie-title-plaque">${Title} -- ${Year}</p>
      <p>
      <button class="yes" id="movie-correct">YES</button>
      <button class="no" id="movie-incorrect">NO</button>
      </p>
    </div>`
  );
  if (Poster !== "N/A") {
    $(".poster-frame").append(
      `<img src="${Poster}" onerror="$(this).hide()" alt="${Title} poster" class="movie-poster">`
    );
  } else {
    $(".poster-frame").append(
      `<img src="../image/blank-poster.jpg" onerror="$(this).hide()" alt="movie poster unavailable" class="movie-poster">`
    );
  }
  $("body").one("click", "button", function (event) {
    event.preventDefault();
    if (`${$(this).prop("id")}` === "movie-correct") {
      console.log('"Yes" button pressed');
      addMovieDetails(results[0]);
    }
    if (`${$(this).prop("id")}` === "movie-incorrect") {
      console.log('"No" button pressed');
      renderMoreApiResults(results, searchTitle);
    }
  });
}

function renderMoreApiResults(results, searchTitle) {
  // Display 10 more OMDB results to the user:
  console.log("renderMoreApiResults() ran");
  emptyTheContainers(); // in index.js
  console.log(results);
  $(".movie-marquee").html(
    `<div class="movie-API-box-1">
      <h2>Is it one of these?</h2>
      <div class="poster-row" id="p-row-1"></div>
      <div class="poster-row" id="p-row-2"></div>
      <div class="poster-row" id="p-row-3"></div>
    </div>`
  );
  for (let i = 1; i < results.length; i++) {
    const { Poster, Title, Year, imdbID } = results[i];
    if (i <= 3) {
      $("#p-row-1").append(
        `<div class="col-4">
          <div class="poster-frame-${i}"></div><br>
          <input type="button" class="movie-title-plaque many" id="movie-correct-plaque-${i}" value="${Title} -- ${Year}"/>
        </div>`
      );
    }
    if (i > 3 && i <= 6) {
      $("#p-row-2").append(
        `<div class="col-4">
          <div class="poster-frame-${i}"></div><br>
          <input type="button" class="movie-title-plaque many" id="movie-correct-plaque-${i}" value="${Title} -- ${Year}"/>
        </div>`
      );
    }
    if (i >= 7) {
      $("#p-row-3").append(
        `<div class="col-4">
          <div class="poster-frame-${i}"></div><br>
          <input type="button" class="movie-title-plaque many" id="movie-correct-plaque-${i}" value="${Title} -- ${Year}"/>
        </div>`
      );
    }
    
    if (Poster === "N/A") {
      $(`.poster-frame-${i}`).append(
        `<input type="image" src="../image/blank-poster.jpg" onerror="$(this).hide()" alt="movie poster unavailable" name="saveForm" class="more-movie-posters" id="movie-correct-${i}"/>`
      );
    } else {
      $(`.poster-frame-${i}`).append(
        `<input type="image" src="${Poster}" onerror="$(this).hide()" alt="${Title} poster" name="saveForm" class="more-movie-posters" id="movie-correct-${i}"/>`
      );
    }
  }
  $(".movie-API-box-1").append(
    `<p><button id="movie-not-here">I don't see my movie listed</button></p>`
  );
  $("body").one("click", "input", function (event) {
    event.preventDefault();
    for (let i = 1; i < 10; i++) {
      if (
        `${$(this).prop("id")}` === `movie-correct-${i}` ||
        `${$(this).prop("id")}` === `movie-correct-plaque-${i}`
      ) {
        console.log(`#${i} movie is correct`);
        addMovieDetails(results[i]);
      }
    }
  });
  $("body").one("click", "button", function (event) {
    event.preventDefault();
    if (`${$(this).prop("id")}` === "movie-not-here") {
      console.log("No movies are correct");
      suggestNewSearch(searchTitle);
    }
  });
}

function addMovieDetails(omdbMovie) {
  // Render a form for submitting movie details:
  console.log("addMovieDetails() ran");
  console.log(omdbMovie);
  const { Poster, Title, Year, imdbID } = omdbMovie;
  /* $('.dynamic-buttons').empty() */
  emptyTheContainers(); // in index.js
  $(".movie-marquee").html(
    `<div class="movie-API-box-1">
      <h2>Add your details</h2>
      <div class="poster-frame"></div>
      <p class="movie-title-plaque">${Title} -- ${Year}</p>
    </div>
    <div class="movie-details-box">
      <form class="movie-submit-form" action="#"><br>
        <label for="rating" class="questions">What did you think of it?</label><br><br>
          <div class="radio-inputs">
            <input type="radio" class="radio-button" name="rating" value="lovedIt" checked required autofocus>
            <label for="lovedIt">Loved it</label><br>
            <input type="radio" class="radio-button" name="rating" value="likedIt">
            <label for="likedIt">Liked it</label><br>
            <input type="radio" class="radio-button" name="rating" value="complicated">
            <label for="complicated">It's complicated</label><br>
            <input type="radio" class="radio-button" name="rating" value="dislikedIt">
            <label for="dislikedIt">Disliked it</label><br>
            <input type="radio" class="radio-button" name="rating" value="hatedIt">
            <label for="hatedIt">Hated it</label><br>
          </div>
        <label for="ownCopy" class="questions">Do you own a copy?</label><br><br>
          <input type="radio" name="ownCopy" value="true" required>
          <label for="true">Yes</label><br>
          <input type="radio" name="ownCopy" value="false" checked>
          <label for="false">No</label><br><br>
        <label for="format" class="questions">Which format(s)? (Leave blank if none)</label><br><br>
          <input type="checkbox" name="format" value="VHS" id="format-vhs">
          <label for="VHS">VHS</label><br>
          <input type="checkbox" name="format" value="LaserDisc" id="format-laserdisc">
          <label for="LaserDisc">LaserDisc</label><br>
          <input type="checkbox" name="format" value="DVD" id="format-dvd">
          <label for="DVD">DVD</label><br>
          <input type="checkbox" name="format" value="Blu-ray" id="format-bluray">
          <label for="Blu-ray">Blu-ray</label><br>
          <input type="checkbox" name="format" value="Digital Copy" id="format-digitalcopy">
          <label for="Digital Copy">Digital Copy</label><br><br>
        <label for="viewingNotes" class="questions">Viewing Notes</label><br><br>
          <textarea name="viewingNotes" id="viewingNotes" rows="10" cols="72" maxlength="10000" placeholder="Type any notes you'd like, up to 10,000 characters. Enjoy re-vueing your favorite moments."></textarea>
        <br><br>
        <button type="submit" class="submit-button">Submit</button>
        <br><br>
      </form>
      <div class="form-errors"></div>
    </div>`
  );
  handleMovieSubmit(omdbMovie);
}

function handleMovieSubmit(omdbMovie) {
  // Create a userMovie object from submitted form data:
  console.log(`handleMovieSubmit(running)`);
  let userMovie = {};
  // Preserves character returns inside "textarea" field:
  $.valHooks.textarea = {
    get: function (elem) {
      return elem.value.replace(/\r?\n/g, "\r\n");
    },
  };
  $(".movie-submit-form").submit(function (event) {
    console.log('"Submit" button pressed');
    event.preventDefault();
    userMovie.title = omdbMovie.Title;
    userMovie.imdbId = omdbMovie.imdbID;
    userMovie.year = omdbMovie.Year;
    userMovie.viewed = $("#viewed").val();
    userMovie.rating = $("input[type=radio][name=rating]:checked").val();
    $("input[type=radio][name=ownCopy]:checked").val(function () {
      // write boolean to .ownCopy instead of string:
      userMovie.ownCopy = this.value === "true" ? true : false;
    });
    // Propagate array from multiple checkboxes:
    userMovie.format = $("input[type=checkbox][name=format]:checked")
      .map(function (_, el) {
        return $(el).val();
      })
      .get();
    userMovie.viewingNotes = $("#viewingNotes").val();
    console.log(userMovie);
    postMovieToDb(userMovie);
  });
}

function postMovieToDb(newMovie, silent) {
  // Post newMovie object to DB:
  console.log(`postMovieToDb() ran`);
  let success;
  if (userName === "Guest") {
    // Do not allow "Guest" to post to db. Add to client previewLibrary instead:
    console.log("Guest attempting to post movie");
    previewLibrary.push(newMovie);
    console.log(previewLibrary);
    renderSuccessMessage(newMovie, true);
  } else {
    // Authorized users may post to db:
    const userToken = localStorage.getItem("auth");
    fetch("/api/movies/", {
      method: "POST",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("response OK");
          success = true;
          return res.json();
        } else if (res.status === 422) {
          console.log("res.status === 422");
          success = false;
          return res.json();
        } else {
          throw new Error(res.statusText);
        }
      })
      .then((responseJson) => {
        if (success === true) {
          console.log("New movie created successfully");
          console.log(responseJson);
          if (!silent) {
            renderSuccessMessage(newMovie);
          }
        } else {
          console.log(responseJson);
          handlePostMovieError(responseJson);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handlePostMovieError(res) {
  console.log(`handlePostMovieError() ran`);
  $(".form-errors").html(`<p>${res.message}</p>`);
}
async function renderSuccessMessage(newMovie, guest) {
  // Display message to user when movie successfully created:
  console.log("renderSuccessMessage() ran");
  const { imdbId, title } = newMovie;
  await updateLibraryResults();
  const index = libraryResults.length;
  if (guest) {
    // Display customized message and buttons for "Guest" account:
    emptyTheContainers(); // in index.js
    $(".video-screen").removeClass("hidden").html(
      `<div class="success-message video-text">
        <h2>${title}</h2> 
        <p>has been added to your virtual library.</p>
        <p>If you'd like to save this movie permanently, please sign-up for an account.</p>`
    );
    $(".film-button-wrapper").html(
      `<div class="film"></div>  
        <div class="film"></div>  
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <button class="film" id="film-1">View your<br>movie</button>
        <button class="film" id="film-2">Add another<br>one</button>
        <div class="film"></div>  
        <div class="film"></div>  
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <script>$('.film').fitText(1, 'compressor * 5.7');</script>`
    );
    $(".dynamic-buttons").html(
      `<button class="ticket" id="sign-up">Sign-up</button>
        <script>$('.ticket').fitText(1, 'compressor * 5.7');</script>`
    );
    $("body").one("click", "button", function (event) {
      if (`${$(this).prop("id")}` === "film-1") {
        console.log('"View your movie" button clicked');
        viewLibraryDetail(imdbId, index - 1); // in view-library.js
      }
    });
  } else {
    // Render success message for registered user:
    emptyTheContainers(); // in index.js
    $(".video-screen").removeClass("hidden").html(
      `<div class="success-message video-text">
        <h2>${title}</h2> 
        <p>has been added to your library.</p>`
    );
    $(".film-button-wrapper").html(
      `<div class="film"></div>  
        <div class="film"></div>  
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <button class="film" id="film-1">View your<br>movie</button>
        <button class="film" id="film-2">Add another<br>one</button>
        <div class="film"></div>  
        <div class="film"></div>  
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <div class="film"></div>
        <script>$('.film').fitText(1, 'compressor * 5.7');</script>`
    );
    $(".film-button-wrapper").one("click", "button", function (event) {
      if (`${$(this).prop("id")}` === "film-1") {
        console.log('"View your movie" button clicked');
        if (index === 0) {
          viewLibraryDetail(imdbId, 0); // in view-library.js
        } else {
          viewLibraryDetail(imdbId, index - 1); // in view-library.js
        }
      }
    });
  }
}

function suggestNewSearch(oldSearch) {
  console.log("suggestNewSearch() ran");
  emptyTheContainers(); // in index.js
  $(".video-screen").removeClass("hidden").html(
    `<div class="video-text">
      <p>We couldn't find any movies with that title.</p>
      <p>Please click 'Add a movie' to try again.</p>
      </div>`
  );
  $(".film-button-wrapper").html(
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
  );
  $(".film-button-wrapper").one("click", "button", function (event) {
    if (`${$(this).prop("id")}` === "film-2") {
      console.log('"Add a movie" button clicked');
      addMovie(oldSearch);
    }
  });
}
