"use strict";

function editMovie(omdbMovie, index) {
  console.log("editMovie() ran");
  console.log(`index = ${index}`);
  const { Poster, Title, Year, imdbID } = omdbMovie;
  const { rating, ownCopy, format, viewingNotes } = libraryResults[index];

  // Propagate form with pre-existing values:
  const checkRating = (radioValue) => {
    return rating === radioValue ? "checked" : "";
  };
  const checkOwnCopy = (radioValue) => {
    return ownCopy === radioValue ? "checked" : "";
  };
  const checkFormat = (checkboxValue) => {
    return format.includes(checkboxValue) === true ? "checked" : "";
  };

  emptyTheContainers(); // in index.js
  $(".movie-marquee").html(
    `<div class="movie-API-box-1">
      <h2>Edit this movie</h2>
      <p class="movie-title-plaque">${Title} — ${Year}</p>
      <div class="poster-frame"></div>
    </div>
    <div class="movie-details-box">
      <form class="movie-edit-form" action="#"><br>
        <label for="rating" class="questions">What did you think of it?</label><br><br>
          <div class="radio-inputs">
            <input type="radio" class="radio-button" name="rating" value="lovedIt" ${checkRating(
              "lovedIt"
            )} required>
            <label for="lovedIt">Loved it</label><br>
            <input type="radio" class="radio-button" name="rating" value="likedIt" ${checkRating(
              "likedIt"
            )}>
            <label for="likedIt">Liked it</label><br>
            <input type="radio" class="radio-button" name="rating" value="complicated" ${checkRating(
              "complicated"
            )}>
            <label for="complicated">It's complicated</label><br>
            <input type="radio" class="radio-button" name="rating" value="dislikedIt" ${checkRating(
              "dislikedIt"
            )}>
            <label for="dislikedIt">Disliked it</label><br>
            <input type="radio" class="radio-button" name="rating" value="hatedIt" ${checkRating(
              "hatedIt"
            )}>
            <label for="hatedIt">Hated it</label><br><br>
          </div>
        <label for="ownCopy" class="questions">Do you own a copy?</label><br><br>
          <input type="radio" name="ownCopy" value="true" ${checkOwnCopy(
            true
          )} required>
          <label for="true">Yes</label><br>
          <input type="radio" name="ownCopy" value="false" ${checkOwnCopy(
            false
          )}>
          <label for="false">No</label><br><br>
        <label for="format" class="questions">Which format(s)? (Leave blank if none)</label><br><br>
          <input type="checkbox" name="format" value="VHS" id="format-vhs" ${checkFormat(
            "VHS"
          )}>
          <label for="VHS">VHS</label><br>
          <input type="checkbox" name="format" value="LaserDisc" id="format-laserdisc" ${checkFormat(
            "LaserDisc"
          )}>
          <label for="LaserDisc">LaserDisc</label><br>
          <input type="checkbox" name="format" value="DVD" id="format-dvd" ${checkFormat(
            "DVD"
          )}>
          <label for="DVD">DVD</label><br>
          <input type="checkbox" name="format" value="Blu-ray" id="format-bluray" ${checkFormat(
            "Blu-ray"
          )}>
          <label for="Blu-ray">Blu-ray</label><br>
          <input type="checkbox" name="format" value="Digital Copy" id="format-digitalcopy" ${checkFormat(
            "Digital Copy"
          )}>
          <label for="Digital Copy">Digital Copy</label><br><br>
        <label for="viewingNotes" class="questions">Viewing Notes</label><br><br>
          <textarea name="viewingNotes" id="viewingNotes" rows="10" cols="72" maxlength="10000" placeholder="Type any notes you'd like, up to 10,000 characters. Enjoy re-vueing your favorite moments.">${viewingNotes}</textarea>
        <br><br>
        <button type="submit" class="submit-button">Update</button>
        <br><br>
      </form>
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
    <div class="film"></div>`
  );
  if (userName !== "Guest") {
    $(".film-button-wrapper").append(
      `<button class="film" id="film-6">Delete</button>`
    );
  }
  $(".film-button-wrapper").append(
    `<button class="film" id="film-5">Cancel</button>
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
  $("body").one("click", "button", function (event) {
    if (`${$(this).prop("id")}` === "film-5") {
      console.log('"Cancel" button pressed');
      viewLibraryDetail(imdbID, index);
    }
    if (`${$(this).prop("id")}` === "film-6") {
      console.log('"Delete" button pressed');
      handleMovieDelete(omdbMovie, index);
    }
  });

  handleMovieEdit(omdbMovie, index);
}

function handleMovieEdit(omdbMovie, index) {
  console.log(`handleMovieEdit(running)`);
  let userMovie = {};
  // Preserves character returns inside "textarea":
  $.valHooks.textarea = {
    get: function (elem) {
      return elem.value.replace(/\r?\n/g, "\r\n");
    },
  };
  $(".movie-edit-form").submit(function (event) {
    console.log("movie-edit-form submitted");
    event.preventDefault();
    userMovie._id = libraryResults[index]._id;
    userMovie.user_id = libraryResults[index].user_id;
    userMovie.title = omdbMovie.Title;
    userMovie.imdbId = omdbMovie.imdbID;
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
    updateMovieInDb(userMovie, index);
  });
}

function updateMovieInDb(editedMovie, index) {
  console.log(`updateMovieInDb() ran`);
  // Do not allow "Guest" to post to db. Add to client previewLibrary instead:
  if (userName === "Guest") {
    console.log("Guest attempting to edit movie");
    previewLibrary[index] = editedMovie;
    console.log(previewLibrary);
    renderEditMessage(editedMovie, index, true);
  } else {
    // Authorized users may PUT to db:
    const userToken = localStorage.getItem("auth");
    fetch(`/api/movies/${editedMovie._id}`, {
      method: "PUT",
      body: JSON.stringify(editedMovie),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("response OK");
          console.log("Movie updated successfully");
          renderEditMessage(editedMovie, index);
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

async function renderEditMessage(editedMovie, index, guest) {
  console.log("renderEditMessage() ran");
  emptyTheContainers(); // in index.js
  if (guest === true) {
    // Display customized message and buttons for "Guest" account:
    $(".video-screen").removeClass("hidden").html(
      `<div class="success-message video-text">
      <h2>${editedMovie.title}</h2> 
      <p>has been updated in your virtual library.</p>
      <p>If you'd like to save your changes permanently, please sign-up for an account.</p>`
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
      <button class="film" id="film-1">View your movie</button>
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
    $("body").one("click", "button", function (event) {
      if (`${$(this).prop("id")}` === "film-1") {
        console.log('"View your movie" button clicked');
        viewLibraryDetail(editedMovie.imdbId, index); // in view-library.js
      }
    });
  } else {
    // Render success message for registered users:
    $(".video-screen").removeClass("hidden").html(
      `<div class="success-message video-text">
        <h2>${editedMovie.title}</h2> 
        <p>has been successfully updated.</p>`
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
        <button class="film" id="film-1">View your movie</button>
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
        viewLibraryDetail(editedMovie.imdbId, index);
      }
    });
  }
}

function handleMovieDelete(omdbMovie, index) {
  console.log(`handleMovieDelete() ran`);
  // Add code here for "Are you sure? Y/N" message and buttons
  deleteMovieInDb(omdbMovie, index);
}

function deleteMovieInDb(omdbMovie, index) {
  console.log(`deleteMovieInDb() ran`);
  const userToken = localStorage.getItem("auth");

  fetch(`/api/movies/${libraryResults[index]._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("response OK");
        console.log("Movie deleted successfully");
        emptyTheContainers();
        $(".video-screen").removeClass("hidden").html(
          `<div class="success-message video-text">
            <h2>${libraryResults[index].title}</h2> 
            <p>has been successfully deleted.</p>`
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
            <button class="film" id="film-4">Return to library</button>
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
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
